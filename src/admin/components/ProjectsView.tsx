import React, { useState, useMemo } from 'react';
import { useAdmin } from '../AdminContext';
import { Project, ProjectStatus } from '../types';
import {
  Plus,
  Search,
  Briefcase,
  ExternalLink,
  Edit2,
  Trash2,
  Calendar,
  Globe,
  RefreshCw,
} from 'lucide-react';
import { getProjectStatusBadge, formatDateShort } from '../utils/formatters';
import ProjectModal from './ProjectModal';
import ConfirmDialog from './ConfirmDialog';

const ALL_PROJECT_STATUSES: ProjectStatus[] = [
  'DEMO',
  'DISCUSSION',
  'IN PROGRESS',
  'REVIEW',
  'COMPLETED',
  'ON HOLD',
];

export default function ProjectsView() {
  const { projects, loadingProjects, projectsError, deleteProject } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.projectName?.toLowerCase().includes(q) ||
        p.clientName?.toLowerCase().includes(q) ||
        p.serviceType?.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [projects, searchQuery, statusFilter]);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleNew = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const handlePromptDelete = (project: Project) => {
    setProjectToDelete(project);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (projectToDelete) {
      await deleteProject(projectToDelete.id);
      setDeleteConfirmOpen(false);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner and Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Client Project Management
            </h2>
            <p className="text-xs text-slate-700 mt-0.5">
              Active engagements, scopes, URLs, and milestone deliveries ({projects.length} total)
            </p>
          </div>

          <button
            type="button"
            onClick={handleNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wider transition-all shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Client Project</span>
          </button>
        </div>

        {/* Filters */}
        <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or clients..."
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-slate-50/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({projects.length})
            </button>
            {ALL_PROJECT_STATUSES.map((st) => {
              const count = projects.filter((p) => p.status === st).length;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === st
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {projectsError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
          {projectsError}
        </div>
      )}

      {/* Projects Grid */}
      {loadingProjects ? (
        <div className="py-20 text-center text-slate-600 text-sm bg-white rounded-xl border border-slate-200">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-slate-400" />
          <span>Loading client projects...</span>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-xl border border-slate-200 p-6">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No client projects found</h3>
          <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
            {searchQuery || statusFilter !== 'ALL'
              ? 'Try adjusting your search criteria.'
              : 'Keep track of all client builds, custom bots, and SEO campaigns here.'}
          </p>
          <button
            type="button"
            onClick={handleNew}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold cursor-pointer shadow-xs"
          >
            + Create First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredProjects.map((project) => {
            const badge = getProjectStatusBadge(project.status);
            return (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg} ${badge.text} ${badge.border}`}
                    >
                      {badge.label}
                    </span>

                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => handleEdit(project)}
                        title="Edit Project"
                        className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePromptDelete(project)}
                        title="Delete Project"
                        className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 leading-snug mb-1">
                    {project.projectName}
                  </h3>
                  <p className="text-xs font-semibold text-slate-700 mb-3">{project.clientName}</p>

                  <div className="text-[11px] font-medium text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md inline-block mb-3 border border-slate-100">
                    {project.serviceType}
                  </div>

                  {project.internalNotes && (
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3 bg-slate-50/50 p-2 rounded border border-slate-100/80">
                      {project.internalNotes}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 mt-2 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1 text-slate-700">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>Deadline:</span>
                    </span>
                    <span className="font-semibold text-slate-700">
                      {project.deadline || 'Ongoing'}
                    </span>
                  </div>

                  {project.liveUrl && (
                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100/60">
                      <span className="text-slate-700">Live URL:</span>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 truncate max-w-[170px]"
                      >
                        <span className="truncate">{project.liveUrl.replace(/^https?:\/\//, '')}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      <ProjectModal
        isOpen={modalOpen}
        project={editingProject}
        onClose={() => {
          setModalOpen(false);
          setEditingProject(null);
        }}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Delete Client Project"
        message={`Are you sure you want to permanently delete "${projectToDelete?.projectName}"? This action cannot be undone.`}
        confirmLabel="Yes, Delete Project"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteConfirmOpen(false);
          setProjectToDelete(null);
        }}
        isDestructive={true}
      />
    </div>
  );
}

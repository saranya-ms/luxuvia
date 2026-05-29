import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ExternalLink, Trash2 } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import API from '../utils/api';
import { toast } from 'sonner';
import Reveal from '../components/Reveal';

const LOGO = 'https://customer-assets.emergentagent.com/job_luxuvia-dev/artifacts/gjc6gs38_luxuvia%20icon.png';

const statusBadgeColor = {
  new: 'bg-[#1e3a8a]/40 text-[#6b8fd4]',
  contacted: 'bg-[#f59218]/15 text-[#f5a848]',
  converted: 'bg-emerald-600/20 text-emerald-300',
  closed: 'bg-red-900/30 text-red-300',
};

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [statsRes, inquiriesRes, projectsRes] = await Promise.all([
          API.get('/stats'),
          API.get('/inquiries'),
          API.get('/projects'),
        ]);

        setStats(statsRes.data);
        setInquiries(inquiriesRes.data);
        setProjects(projectsRes.data);
      } catch (error) {
        toast.error('Failed to load admin data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  const handleStatusUpdate = async (inquiryId, newStatus) => {
    try {
      await API.put(`/inquiries/${inquiryId}/status`, { status: newStatus });
      setInquiries((prev) =>
        prev.map((inq) =>
          inq._id === inquiryId ? { ...inq, status: newStatus } : inq
        )
      );
      toast.success('Status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await API.delete(`/projects/${projectId}`);
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
      toast.success('Project deleted');
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  if (!localStorage.getItem('admin_token')) {
    return null;
  }

  if (loading) {
    return (
      <div className="bg-dark-base text-text-white min-h-screen flex items-center justify-center">
        <div className="text-[#8090b0]">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="bg-dark-base text-text-white min-h-screen">
      {/* Header */}
      <div className="bg-[#1e3a8a] border-b border-[#1e2d50] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={LOGO} alt="Luxuvia" className="h-8 w-auto" />
            <div>
              <h1 className="font-heading text-xl text-[#eef1f6]">Admin Panel</h1>
              <p className="font-body text-xs text-[#8090b0]">Luxuvia Management</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-900/20 border border-red-600/30 rounded-md text-red-400 hover:bg-red-900/30 transition-colors"
          >
            <LogOut size={18} />
            <span className="font-body text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Total Projects', value: stats.total_projects },
              { label: 'Total Inquiries', value: stats.total_inquiries },
              { label: 'New Inquiries', value: stats.new_inquiries },
              { label: 'Completed', value: stats.completed_projects },
            ].map((stat, idx) => (
              <Reveal key={idx} delay={idx * 50}>
                <div className="bg-[#0f1628] border border-[#1e2d50] rounded-md p-6">
                  <p className="font-body text-xs text-[#8090b0] uppercase tracking-wider mb-2">
                    {stat.label}
                  </p>
                  <p className="font-heading text-3xl text-[#f59218]">{stat.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* Tabs */}
        <Tabs.Root defaultValue="inquiries" className="w-full">
          <Tabs.List className="flex gap-4 border-b border-[#1e2d50] mb-8">
            <Tabs.Trigger
              value="inquiries"
              className="font-body text-sm font-semibold pb-3 border-b-2 border-transparent data-[state=active]:border-[#f59218] data-[state=active]:text-[#f59218] text-[#8090b0] hover:text-[#eef1f6] transition-colors"
            >
              Inquiries ({inquiries.length})
            </Tabs.Trigger>
            <Tabs.Trigger
              value="projects"
              className="font-body text-sm font-semibold pb-3 border-b-2 border-transparent data-[state=active]:border-[#f59218] data-[state=active]:text-[#f59218] text-[#8090b0] hover:text-[#eef1f6] transition-colors"
            >
              Projects ({projects.length})
            </Tabs.Trigger>
          </Tabs.List>

          {/* Inquiries Tab */}
          <Tabs.Content value="inquiries" className="space-y-4">
            {inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <Reveal key={inquiry._id}>
                  <div className="bg-[#0f1628] border border-[#1e2d50] rounded-md p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                      <div>
                        <h3 className="font-heading text-lg text-[#eef1f6]">{inquiry.name}</h3>
                        <p className="font-body text-sm text-[#8090b0]">{inquiry.project_name}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          statusBadgeColor[inquiry.status] || statusBadgeColor.new
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <p className="font-body text-[#8090b0] text-xs">Phone</p>
                        <p className="font-body text-[#eef1f6]">{inquiry.phone}</p>
                      </div>
                      <div>
                        <p className="font-body text-[#8090b0] text-xs">Email</p>
                        <p className="font-body text-[#eef1f6] truncate">{inquiry.email}</p>
                      </div>
                      <div>
                        <p className="font-body text-[#8090b0] text-xs">Type</p>
                        <p className="font-body text-[#eef1f6]">{inquiry.inquiry_type}</p>
                      </div>
                      <div>
                        <p className="font-body text-[#8090b0] text-xs">Date</p>
                        <p className="font-body text-[#eef1f6]">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {inquiry.message && (
                      <div className="mb-4">
                        <p className="font-body text-[#8090b0] text-xs mb-2">Message</p>
                        <p className="font-body text-[#eef1f6] bg-[#0a0e1a]/50 p-3 rounded text-sm">
                          {inquiry.message}
                        </p>
                      </div>
                    )}

                    {/* Status Buttons */}
                    <div className="flex flex-wrap gap-2">
                      {['new', 'contacted', 'converted', 'closed'].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusUpdate(inquiry._id, status)}
                          className={`px-3 py-1 rounded-sm text-xs font-semibold transition-colors ${
                            inquiry.status === status
                              ? 'bg-[#f59218] text-white'
                              : 'bg-[#1e2d50]/30 text-[#8090b0] hover:bg-[#1e2d50]/50'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))
            ) : (
              <div className="text-center py-12 text-[#8090b0]">No inquiries yet</div>
            )}
          </Tabs.Content>

          {/* Projects Tab */}
          <Tabs.Content value="projects" className="space-y-4">
            {projects.length > 0 ? (
              projects.map((project) => (
                <Reveal key={project._id}>
                  <div className="bg-[#0f1628] border border-[#1e2d50] rounded-md p-6 flex items-start justify-between">
                    <div className="flex gap-6 flex-1">
                      {project.images && project.images[0] && (
                        <img
                          src={project.images[0]}
                          alt={project.name}
                          className="w-24 h-24 object-cover rounded-md border border-[#1e2d50]"
                        />
                      )}
                      <div>
                        <h3 className="font-heading text-lg text-[#eef1f6] mb-2">
                          {project.name}
                        </h3>
                        <p className="font-body text-sm text-[#8090b0] mb-2">
                          {project.location}
                        </p>
                        <div className="flex gap-4 text-xs font-body text-[#8090b0]">
                          <span>Status: {project.status}</span>
                          <span>Units: {project.total_units}</span>
                          <span>RERA: {project.rera_id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-[#1e3a8a]/30 border border-[#3b5fc0]/30 rounded-md text-[#6b8fd4] hover:bg-[#1e3a8a]/50 transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="p-2 bg-red-900/20 border border-red-600/30 rounded-md text-red-400 hover:bg-red-900/30 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))
            ) : (
              <div className="text-center py-12 text-[#8090b0]">No projects yet</div>
            )}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Upload, Search, Filter, Edit, Trash2, Archive, 
  ChevronDown, ChevronRight, Settings, Languages
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useServiceConfiguration } from '@/hooks/useServiceConfiguration';
import ServiceFormModal from '@/components/ServiceFormModal';
import BulkUploadModal from '@/components/BulkUploadModal';

export default function ServiceConfigurationPage() {
  const { 
    services, 
    addService, 
    updateService, 
    deleteService, 
    toggleServiceStatus,
    bulkUploadServices
  } = useServiceConfiguration();

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRows, setExpandedRows] = useState({});
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const toggleRow = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreate = () => {
    setEditingService(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setIsFormModalOpen(true);
  };

  const handleSaveForm = (formData) => {
    if (editingService) {
      updateService(editingService.id, formData);
    } else {
      addService(formData);
    }
  };

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Helmet>
        <title>Service Configuration | Admin Dashboard</title>
        <meta name="description" content="Manage translation services, language pairs, and pricing." />
      </Helmet>

      <div className="service-config-container">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-xl border border-border shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center">
              <Settings className="w-6 h-6 mr-3 text-primary" />
              Service Configuration
            </h1>
            <p className="text-muted-foreground mt-1">Manage translation services, language pairs, and pricing models.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => setIsUploadModalOpen(true)} variant="outline" className="border-border text-foreground hover:bg-muted">
              <Upload className="w-4 h-4 mr-2" /> Bulk Upload
            </Button>
            <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" /> Create New Service
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-card text-foreground"
            />
          </div>
          <Button variant="ghost" className="text-muted-foreground w-full sm:w-auto">
            <Filter className="w-4 h-4 mr-2" /> Filter Options
          </Button>
        </div>

        {/* Services List View */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium w-10"></th>
                  <th className="px-6 py-4 font-medium">Service Name</th>
                  <th className="px-6 py-4 font-medium">Pairs</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium hidden md:table-cell">Last Modified</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredServices.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-muted-foreground">
                      No services found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredServices.map(service => (
                    <React.Fragment key={service.id}>
                      <tr className="hover:bg-muted/30 transition-colors group">
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => toggleRow(service.id)}
                            className="p-1 rounded-md hover:bg-muted text-muted-foreground transition-colors"
                          >
                            {expandedRows[service.id] ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-foreground">{service.name}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-xs">{service.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-muted-foreground">
                            <Languages className="w-4 h-4 mr-2 text-primary/70" />
                            {service.languagePairs.length}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`status-badge ${service.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                            {service.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">
                          {service.lastModifiedDate}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(service)} className="h-8 w-8 text-primary hover:bg-primary/10 hover:text-primary">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => toggleServiceStatus(service.id)} className="h-8 w-8 text-muted-foreground hover:bg-muted">
                              <Archive className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteService(service.id)} className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      
                      {/* Expanded Nested Table */}
                      <AnimatePresence>
                        {expandedRows[service.id] && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="nested-table-row"
                          >
                            <td colSpan="6" className="p-0">
                              <div className="nested-table-container">
                                {service.languagePairs.length > 0 ? (
                                  <table className="w-full text-sm mb-2 border border-border/50 rounded-lg overflow-hidden bg-card">
                                    <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider">
                                      <tr>
                                        <th className="px-4 py-3 font-medium">Source → Target</th>
                                        <th className="px-4 py-3 font-medium">Category</th>
                                        <th className="px-4 py-3 font-medium">Rate</th>
                                        <th className="px-4 py-3 font-medium text-center">VAT</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                      {service.languagePairs.map((pair, idx) => (
                                        <tr key={pair.id || idx} className="hover:bg-muted/20">
                                          <td className="px-4 py-3 font-medium text-foreground">
                                            {pair.source} <span className="text-muted-foreground mx-1">→</span> {pair.target}
                                          </td>
                                          <td className="px-4 py-3 text-muted-foreground">{pair.category}</td>
                                          <td className="px-4 py-3 text-foreground">
                                            ${pair.basePrice.toFixed(2)} <span className="text-xs text-muted-foreground ml-1">({pair.priceUnit})</span>
                                          </td>
                                          <td className="px-4 py-3 text-center">
                                            {pair.vat ? (
                                              <span className="inline-block px-2 py-1 bg-muted text-foreground text-xs rounded">
                                                Yes ({pair.vatPercentage}%)
                                              </span>
                                            ) : (
                                              <span className="text-muted-foreground">-</span>
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                ) : (
                                  <p className="text-sm text-muted-foreground py-2 italic">No language pairs defined for this service.</p>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isFormModalOpen && (
          <ServiceFormModal 
            isOpen={isFormModalOpen} 
            onClose={() => setIsFormModalOpen(false)} 
            initialData={editingService}
            onSave={handleSaveForm}
          />
        )}
        
        {isUploadModalOpen && (
          <BulkUploadModal 
            isOpen={isUploadModalOpen} 
            onClose={() => setIsUploadModalOpen(false)}
            onUpload={bulkUploadServices}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
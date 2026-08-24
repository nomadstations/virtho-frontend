import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Globe, Clock, DollarSign, User, Mail, Calendar, ArrowRight, Languages, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PublicBreadcrumb from '@/components/PublicBreadcrumb';
import LanguageServiceCard from '@/components/LanguageServiceCard';
import { useLanguageServices } from '@/hooks/useLanguageServices';
import { getLanguagePairLabel, getServiceTypeLabel, formatPrice, PRICING_MODELS } from '@/constants/languageServiceConfig';
import { formatCurrency } from '@/api/EcommerceApi';

function LanguageServiceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, getServiceById } = useLanguageServices();
  
  const service = getServiceById(id);
  const relatedServices = services
    .filter(s => s.id !== id && s.serviceType === service?.serviceType)
    .slice(0, 4);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Not Found</h2>
          <p className="text-gray-600 mb-6">The language service you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/language-services')}>
            Browse All Services
          </Button>
        </div>
      </div>
    );
  }

  const pricingModel = PRICING_MODELS.find(p => p.value === service.pricingModel);

  return (
    <>
      <Helmet>
        <title>{service.name} | Language Services | Virtho Foundation</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PublicBreadcrumb customCrumbs={[
            { label: 'Home', path: '/' },
            { label: 'Language Services', path: '/language-services' },
            { label: service.name, path: `/language-services/${id}` }
          ]} />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Service Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <Badge className="mb-3 bg-blue-100 text-blue-700 border-blue-200">
                      {getServiceTypeLabel(service.serviceType)}
                    </Badge>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                      {service.name}
                    </h1>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <img 
                          src={service.providerAvatar} 
                          alt={service.providerName}
                          className="w-8 h-8 rounded-full border border-gray-200"
                        />
                        <span className="font-semibold text-gray-900">{service.providerName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">{service.rating}</span>
                        <span>({service.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span>{service.totalOrders} orders</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Service Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </motion.div>

              {/* Language Pairs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-blue-600" />
                  Language Pairs
                </h2>
                <div className="flex flex-wrap gap-2">
                  {service.languagePairs.map((pair, index) => (
                    <Badge key={index} variant="outline" className="text-sm px-3 py-1.5">
                      {getLanguagePairLabel(pair)}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Specializations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Specializations
                </h2>
                <div className="flex flex-wrap gap-2">
                  {service.specializations.map((spec, index) => (
                    <Badge key={index} className="bg-purple-100 text-purple-700 border-purple-200 text-sm px-3 py-1.5">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Pricing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Pricing & Delivery
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Pricing Model</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {pricingModel?.label || 'Custom'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Base Price</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatPrice(service.price, service.currency, service.pricingModel)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Turnaround Time</p>
                    <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {service.turnaroundTime}
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <p className="text-sm text-blue-700 mb-1">Example Price</p>
                    <p className="text-sm text-blue-900">
                      1000 words × ${service.price} = ${(service.price * 1000).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Reviews Section */}
              {service.reviewCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-8"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews & Ratings</h2>
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="text-center">
                      <div className="text-5xl font-extrabold text-gray-900 mb-2">
                        {service.rating}
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.round(service.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">{service.reviewCount} reviews</p>
                    </div>
                  </div>
                  <div className="text-center text-gray-500 py-8">
                    <p>Reviews will be displayed here</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Provider Info Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">About the Provider</h3>
                  <div className="text-center mb-6">
                    <img 
                      src={service.providerAvatar} 
                      alt={service.providerName}
                      className="w-20 h-20 rounded-full border-2 border-blue-100 mx-auto mb-3"
                    />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {service.providerName}
                    </h4>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{service.rating}</span>
                      <span className="text-gray-600">({service.reviewCount})</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center justify-center gap-1">
                      <Globe className="w-3 h-3" />
                      {service.totalOrders} orders completed
                    </p>
                    <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Member since 2024
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      <User className="w-4 h-4 mr-2" />
                      View Provider Profile
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Provider
                    </Button>
                  </div>
                </motion.div>

                {/* Order CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white"
                >
                  <h3 className="text-xl font-bold mb-2">Ready to Order?</h3>
                  <p className="text-blue-100 text-sm mb-6">
                    Get professional {service.serviceType} services starting at {formatPrice(service.price, service.currency, service.pricingModel)}
                  </p>
                  <Button 
                    onClick={() => navigate(`/language-services/order/${id}`)}
                    className="w-full bg-white text-blue-700 hover:bg-blue-50 font-semibold"
                    size="lg"
                  >
                    Order Service
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Services</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedServices.map(relatedService => (
                  <LanguageServiceCard key={relatedService.id} service={relatedService} />
                ))}
              </div>
              <div className="text-center mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/language-services')}
                >
                  View All Services
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

export default LanguageServiceDetailsPage;
import React from 'react';
import { Helmet } from 'react-helmet';
import { Heart, Activity, Coffee, Brain, Shield, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function HealthPage() {
  const { toast } = useToast();

  const handleAction = () => {
    toast({
      title: "Coming Soon",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const tips = [
    { icon: <Activity className="w-8 h-8 text-rose-500" />, title: "Daily Exercise", desc: "Aim for at least 30 minutes of moderate physical activity every day to keep your heart healthy." },
    { icon: <Coffee className="w-8 h-8 text-amber-500" />, title: "Hydration", desc: "Drink at least 8 glasses of water daily. Proper hydration is crucial for joint health and energy levels." },
    { icon: <Brain className="w-8 h-8 text-purple-500" />, title: "Mental Rest", desc: "Practice mindfulness or meditation for 10 minutes a day to reduce stress and improve focus." },
    { icon: <Sun className="w-8 h-8 text-yellow-500" />, title: "Vitamin D", desc: "Get 15-20 minutes of sun exposure daily to maintain healthy vitamin D levels for bone health." }
  ];

  const articles = [
    { title: "Understanding Sleep Cycles", category: "Wellness", readTime: "5 min read", img: "https://images.unsplash.com/photo-1511295742362-92c96b12a3d9?auto=format&fit=crop&q=80&w=600" },
    { title: "Nutrition Myths Busted", category: "Diet", readTime: "8 min read", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600" },
    { title: "The Power of Preventive Care", category: "Medical", readTime: "6 min read", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Helmet>
        <title>Health & Wellness - Virtho</title>
        <meta name="description" content="Discover health resources, wellness tips, and articles for a balanced lifestyle." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1695462131822-368776114494" 
            alt="Healthy lifestyle with fresh food and fitness gear" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-teal-800/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <Heart className="w-16 h-16 mx-auto mb-6 text-rose-400" />
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Your Journey to Better Health
          </h1>
          <p className="text-lg md:text-xl text-teal-100 max-w-2xl mx-auto mb-10">
            Explore our comprehensive wellness guides, daily health tips, and expert resources designed to help you live your best life.
          </p>
          <Button onClick={handleAction} size="lg" className="bg-white text-teal-900 hover:bg-gray-100 font-bold rounded-full px-8">
            Get Personalized Plan
          </Button>
        </div>
      </section>

      {/* Wellness Tips */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Daily Wellness Tips</h2>
          <p className="text-gray-600">Simple changes for a healthier tomorrow.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, idx) => (
            <Card key={idx} className="rounded-xl border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tip.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Health Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold">
                <Shield className="w-4 h-4" /> Trusted Resources
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Comprehensive Health Tracking & Resources
              </h2>
              <p className="text-lg text-gray-600">
                Access a wide range of tools to monitor your progress, from fitness trackers to nutritional databases. Empower yourself with knowledge.
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">✓</div>
                  Personalized meal planning guides
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">✓</div>
                  Symptom checker and first aid tips
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">✓</div>
                  Mental health assessment tools
                </li>
              </ul>
              <Button onClick={handleAction} className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">
                Explore All Tools
              </Button>
            </div>
            <div className="flex-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800" alt="Doctor consulting with patient" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <p className="text-white font-medium text-lg">"Health is a state of complete harmony of the body, mind and spirit."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Articles</h2>
            <p className="text-gray-600">Latest insights from health experts.</p>
          </div>
          <Button onClick={handleAction} variant="ghost" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 hidden sm:flex">
            View All Articles
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <Card key={idx} className="overflow-hidden rounded-xl border-none shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 group cursor-pointer" onClick={handleAction}>
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={article.img} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-800">
                  {article.category}
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-xs text-gray-500 mb-2 font-medium">{article.readTime}</p>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {article.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Button onClick={handleAction} variant="outline" className="w-full">
            View All Articles
          </Button>
        </div>
      </section>
    </div>
  );
}
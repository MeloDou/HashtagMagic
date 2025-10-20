'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Briefcase, Palette, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const router = useRouter();

  const personas = [
    {
      id: 'luxury',
      name: 'Luxury Influencer',
      description: 'High-end fashion, luxury lifestyle, premium brands',
      icon: Crown,
      color: 'from-rose-400 to-pink-500',
      bgColor: 'bg-gradient-to-br from-rose-50 to-pink-100',
      borderColor: 'border-rose-200',
      textColor: 'text-rose-800'
    },
    {
      id: 'business',
      name: 'Business Owner',
      description: 'Professional networking, industry expertise, B2B marketing',
      icon: Briefcase,
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800'
    },
    {
      id: 'creator',
      name: 'Content Creator',
      description: 'Creative content, viral potential, community building',
      icon: Palette,
      color: 'from-purple-400 to-violet-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-violet-100',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Hashtag Magic
            </h1>
          </div>
          <div className="text-sm text-gray-600">
            Professional hashtags in seconds
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Stop wasting time on hashtag research
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Focus on creating, we'll handle the rest. Get professional hashtags tailored to your content type in seconds.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Sparkles className="h-4 w-4 mr-1" />
                One-time payment
              </span>
              <span className="flex items-center">
                <Sparkles className="h-4 w-4 mr-1" />
                No subscription
              </span>
              <span className="flex items-center">
                <Sparkles className="h-4 w-4 mr-1" />
                Lifetime access
              </span>
            </div>
          </motion.div>

          {/* Persona Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              What type of content creator are you?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {personas.map((persona, index) => {
                const IconComponent = persona.icon;
                return (
                  <motion.div
                    key={persona.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedPersona === persona.id
                        ? `${persona.bgColor} ${persona.borderColor} border-opacity-100`
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPersona(persona.id)}
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${persona.color} flex items-center justify-center mb-4 mx-auto`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h4 className={`text-lg font-semibold mb-2 ${selectedPersona === persona.id ? persona.textColor : 'text-gray-900'}`}>
                      {persona.name}
                    </h4>
                    <p className={`text-sm ${selectedPersona === persona.id ? persona.textColor : 'text-gray-600'}`}>
                      {persona.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {selectedPersona ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(`/generate?persona=${selectedPersona}`)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started - $29.99 One Time
              </motion.button>
            ) : (
              <p className="text-gray-500 text-sm">
                Select your persona to continue
              </p>
            )}
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h4>
              <p className="text-gray-600 text-sm">Advanced AI generates hashtags tailored to your content</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Trending Data</h4>
              <p className="text-gray-600 text-sm">Always up-to-date with the latest trending hashtags</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Professional Results</h4>
              <p className="text-gray-600 text-sm">Look like you have a social media team</p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-gray-200">
        <div className="text-center text-gray-500 text-sm">
          <p>© 2024 Hashtag Magic. Focus on creating, we'll handle the rest.</p>
        </div>
      </footer>
    </div>
  );
}

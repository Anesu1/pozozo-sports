'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, Sparkles } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export function SizeGuideModal({ isOpen, onClose, category }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'cm' | 'in'>('in');

  const topsSizes = [
    { size: 'XS', chestIn: '34-36', chestCm: '86-91', lengthIn: '26.5', lengthCm: '67', sleeveIn: '31.5', sleeveCm: '80' },
    { size: 'S', chestIn: '36-38', chestCm: '91-96', lengthIn: '27.5', lengthCm: '70', sleeveIn: '32.5', sleeveCm: '83' },
    { size: 'M', chestIn: '38-40', chestCm: '96-102', lengthIn: '28.5', lengthCm: '72', sleeveIn: '33.5', sleeveCm: '85' },
    { size: 'L', chestIn: '40-42', chestCm: '102-107', lengthIn: '29.5', lengthCm: '75', sleeveIn: '34.5', sleeveCm: '88' },
    { size: 'XL', chestIn: '42-44', chestCm: '107-112', lengthIn: '30.5', lengthCm: '77', sleeveIn: '35.5', sleeveCm: '90' },
    { size: 'XXL', chestIn: '44-46', chestCm: '112-117', lengthIn: '31.5', lengthCm: '80', sleeveIn: '36.5', sleeveCm: '93' },
  ];

  const bottomsSizes = [
    { size: 'XS', waistIn: '28-29', waistCm: '71-74', hipIn: '35-36', hipCm: '89-91', inseamIn: '30', inseamCm: '76' },
    { size: 'S', waistIn: '30-31', waistCm: '76-79', hipIn: '37-38', hipCm: '94-97', inseamIn: '31', inseamCm: '79' },
    { size: 'M', waistIn: '32-33', waistCm: '81-84', hipIn: '39-40', hipCm: '99-102', inseamIn: '32', inseamCm: '81' },
    { size: 'L', waistIn: '34-35', waistCm: '86-89', hipIn: '41-42', hipCm: '104-107', inseamIn: '32', inseamCm: '81' },
    { size: 'XL', waistIn: '36-38', waistCm: '91-97', hipIn: '43-45', hipCm: '109-114', inseamIn: '33', inseamCm: '84' },
  ];

  const isBottom = category === 'pants';
  const tableData = isBottom ? bottomsSizes : topsSizes;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="min-h-screen px-4 flex items-center justify-center py-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-[#E8E4DF] z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DF]">
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-[#1A1A1A]" />
                  <h3 className="text-lg font-bold text-[#1A1A1A]">
                    {isBottom ? 'Bottoms Size Guide' : 'Tops & Outerwear Size Guide'}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-[#757575] hover:text-[#1A1A1A] hover:bg-black/5 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Unit Switcher */}
              <div className="my-5 flex items-center justify-between">
                <span className="text-xs text-[#757575]">
                  Select preferred measurement units:
                </span>
                <div className="flex items-center bg-[#F6F4F1] p-1 rounded-lg border border-[#E8E4DF]">
                  <button
                    onClick={() => setUnit('in')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                      unit === 'in' ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-[#757575]'
                    }`}
                  >
                    Inches (in)
                  </button>
                  <button
                    onClick={() => setUnit('cm')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                      unit === 'cm' ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-[#757575]'
                    }`}
                  >
                    Centimeters (cm)
                  </button>
                </div>
              </div>

              {/* Measurement Table */}
              <div className="overflow-x-auto border border-[#E8E4DF] rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F6F4F1] border-b border-[#E8E4DF] text-[#1A1A1A]">
                    <tr>
                      <th className="p-3 font-bold">Size</th>
                      {isBottom ? (
                        <>
                          <th className="p-3 font-bold">Waist ({unit})</th>
                          <th className="p-3 font-bold">Hips ({unit})</th>
                          <th className="p-3 font-bold">Inseam ({unit})</th>
                        </>
                      ) : (
                        <>
                          <th className="p-3 font-bold">Chest ({unit})</th>
                          <th className="p-3 font-bold">Body Length ({unit})</th>
                          <th className="p-3 font-bold">Sleeve ({unit})</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E4DF]">
                    {tableData.map((row) => (
                      <tr key={row.size} className="hover:bg-[#F6F4F1]/50 transition-colors">
                        <td className="p-3 font-bold text-[#1A1A1A]">{row.size}</td>
                        {isBottom ? (
                          <>
                            {/* @ts-ignore */}
                            <td className="p-3 text-[#757575]">{unit === 'in' ? row.waistIn : row.waistCm}</td>
                            {/* @ts-ignore */}
                            <td className="p-3 text-[#757575]">{unit === 'in' ? row.hipIn : row.hipCm}</td>
                            {/* @ts-ignore */}
                            <td className="p-3 text-[#757575]">{unit === 'in' ? row.inseamIn : row.inseamCm}</td>
                          </>
                        ) : (
                          <>
                            {/* @ts-ignore */}
                            <td className="p-3 text-[#757575]">{unit === 'in' ? row.chestIn : row.chestCm}</td>
                            {/* @ts-ignore */}
                            <td className="p-3 text-[#757575]">{unit === 'in' ? row.lengthIn : row.lengthCm}</td>
                            {/* @ts-ignore */}
                            <td className="p-3 text-[#757575]">{unit === 'in' ? row.sleeveIn : row.sleeveCm}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Fit Tips */}
              <div className="mt-5 p-3.5 bg-[#F6F4F1] rounded-xl flex items-start gap-2.5 text-xs text-[#757575]">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#1A1A1A]">Fitting Advice:</strong> If you are between sizes or prefer an oversized drape, we recommend sizing up one size. Free returns and exchanges apply to all unworn items.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

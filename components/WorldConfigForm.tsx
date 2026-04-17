import React, { useState } from 'react';
import { WorldConfig } from '../aether';

interface Props {
  config: WorldConfig;
  onConfigChange: (newConfig: WorldConfig) => void;
  onRegenerate: () => void;
}

const Section: React.FC<{ id?: string; title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ id, title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const sectionId = id || `section-${title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;
    return (
        <div id={sectionId} className="border border-slate-700/50 rounded-xl bg-slate-800/40 backdrop-blur-md mb-2 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-sky-900/20 hover:border-slate-600/50">
            <button 
                id={`${sectionId}-toggle`}
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-3 py-2 bg-gradient-to-r from-slate-800/80 to-slate-800/40 hover:from-slate-700/80 hover:to-slate-700/40 text-sky-300 font-bold text-xs tracking-wider flex justify-between items-center transition-all"
            >
                <div className="flex items-center gap-2">
                    <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-90 text-sky-400' : 'text-slate-500'}`}>▸</span>
                    {title}
                </div>
                <span className="text-slate-500 text-[10px]">{isOpen ? 'HIDE' : 'SHOW'}</span>
            </button>
            <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
               <div className="p-3 grid grid-cols-2 gap-x-3 gap-y-2">{children}</div>
            </div>
        </div>
    );
};

const RangeControl: React.FC<{ 
    label: string; 
    value: number; 
    min: number; 
    max: number; 
    step: number; 
    id?: string;
    onChange: (val: number) => void;
    format?: (val: number) => string; 
}> = ({ label, value, min, max, step, onChange, format, id }) => {
    const inputId = id || `range-${label.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;
    const percentage = ((value - min) / (max - min)) * 100;
    
    return (
    <div className="group relative">
        <div className="flex justify-between items-center text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
            <label htmlFor={inputId} className="group-hover:text-sky-300 transition-colors drop-shadow-sm truncate pr-1" title={label}>{label}</label>
            <span id={`${inputId}-value`} className="text-sky-200 font-mono bg-sky-900/40 px-1.5 py-0.5 rounded border border-sky-800/50 shadow-inner group-hover:bg-sky-800/50 transition-colors flex-shrink-0">{format ? format(value) : value.toFixed(2)}</span>
        </div>
        <div className="relative flex items-center h-4">
            <div className="absolute w-full h-1.5 bg-slate-700/50 rounded-full shadow-inner overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-sky-600 to-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all duration-150 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <input 
                type="range" min={min} max={max} step={step}
                id={inputId}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="absolute w-full h-full opacity-0 cursor-pointer pointer-events-auto"
            />
        </div>
    </div>
    );
};

export const WorldConfigForm: React.FC<Props> = ({ config, onConfigChange, onRegenerate }) => {
  const handleChange = (key: keyof WorldConfig, value: string | number) => {
    onConfigChange({ ...config, [key]: value });
  };

  return (
    <div id="world-config-form" className="mb-4 text-xs font-mono max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar flex-shrink-0">
      <div className="mb-3 p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl shadow-inner relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />
        <label htmlFor="seed-input" className="text-slate-400 text-[10px] block mb-1.5 uppercase font-bold tracking-widest group-hover:text-sky-300 transition-colors">WORLD SEED ID</label>
        <div className="flex gap-2 relative z-10">
            <input 
                id="seed-input"
                type="text" 
                value={config.seed}
                onChange={(e) => handleChange('seed', e.target.value)}
                className="bg-slate-900/80 border border-slate-600 rounded-lg px-3 py-2 text-sky-100 w-full font-mono text-xs focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 shadow-inner transition-all"
            />
            <button id="btn-randomize-seed" onClick={() => handleChange('seed', Math.random().toString(36).substring(7))} className="bg-slate-700 hover:bg-slate-600 active:bg-slate-500 border border-slate-600 px-3 rounded-lg transition-all flex items-center justify-center hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]" title="Randomize Seed">
                <span className="text-lg">🎲</span>
            </button>
        </div>
      </div>

      <Section id="section-terrain" title="TERRAIN & NOISE" defaultOpen={true}>
         <RangeControl id="range-global-scale" label="Global Scale" value={config.globalScale} min={0.5} max={5.0} step={0.1} onChange={(v) => handleChange('globalScale', v)} />
         <RangeControl id="range-sea-level" label="Sea Level" value={config.seaLevel} min={-0.8} max={0.8} step={0.05} onChange={(v) => handleChange('seaLevel', v)} />
         <RangeControl id="range-elevation-impact" label="Elevation Impact" value={config.elevationScale} min={0.001} max={0.05} step={0.001} onChange={(v) => handleChange('elevationScale', v)} />
         <RangeControl id="range-roughness" label="Roughness" value={config.roughness} min={0.0} max={1.0} step={0.05} onChange={(v) => handleChange('roughness', v)} />
         <RangeControl id="range-detail" label="Detail (Octaves)" value={config.detail} min={1} max={6} step={1} onChange={(v) => handleChange('detail', v)} format={(v) => v.toFixed(0)} />
      </Section>

      <Section id="section-biomes" title="BIOMES & CLIMATE">
         <RangeControl id="range-moisture" label="Moisture Scale" value={config.moistureScale} min={0.001} max={0.05} step={0.001} onChange={(v) => handleChange('moistureScale', v)} />
         <RangeControl id="range-temp-offset" label="Temp. Offset" value={config.temperatureOffset} min={-1.0} max={1.0} step={0.1} onChange={(v) => handleChange('temperatureOffset', v)} />
      </Section>

      <Section id="section-civilization" title="CIVILIZATION">
         <RangeControl id="range-struct-chance" label="Structure Chance" value={config.structureChance} min={0} max={1} step={0.05} onChange={(v) => handleChange('structureChance', v)} format={(v) => `${(v*100).toFixed(0)}%`} />
         <RangeControl id="range-struct-spacing" label="Spacing (Sparsity)" value={config.structureSpacing} min={1} max={10} step={1} onChange={(v) => handleChange('structureSpacing', v)} format={(v) => `${v} chunks`} />
         <RangeControl id="range-struct-size" label="Avg Size" value={config.structureSizeAvg} min={5} max={20} step={1} onChange={(v) => handleChange('structureSizeAvg', v)} format={(v) => `${v} tiles`} />
         <RangeControl id="range-road-density" label="Road Density" value={config.roadDensity} min={0} max={1} step={0.05} onChange={(v) => handleChange('roadDensity', v)} />
      </Section>

      <Section id="section-gameplay" title="GAMEPLAY">
         <RangeControl id="range-fog-radius" label="Fog Radius" value={config.fogRadius} min={5} max={40} step={1} onChange={(v) => handleChange('fogRadius', v)} format={(v) => `${v} tiles`} />
      </Section>

      <button 
        id="btn-refresh-world"
        onClick={onRegenerate}
        className="w-full relative overflow-hidden group bg-gradient-to-b from-sky-500 to-sky-700 hover:from-sky-400 hover:to-sky-600 text-white font-black tracking-widest py-2.5 rounded-xl mt-2 transition-all border-b-[5px] border-sky-900 active:border-b-[1px] active:translate-y-[4px] shadow-[0_4px_15px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.4)] flex justify-center items-center gap-2"
      >
        <span className="relative z-10 drop-shadow-md">REFRESH WORLD</span>
        <svg className="w-5 h-5 relative z-10 drop-shadow-md group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      </button>
    </div>
  );
};
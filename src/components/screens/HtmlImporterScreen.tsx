import React, { useState, useEffect } from 'react';
import { SAMPLE_TEMPLATES } from '../../data/mockData';
import { SampleTemplate } from '../../types';
import { Code2, Play, Copy, Check, Sparkles, Layers, Image as ImageIcon, ExternalLink, RefreshCw, FileCode } from 'lucide-react';

export const HtmlImporterScreen: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(SAMPLE_TEMPLATES[0].id);
  const [htmlCode, setHtmlCode] = useState<string>(SAMPLE_TEMPLATES[0].htmlContent);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [extractedImages, setExtractedImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'assets'>('preview');

  // Parse hotlinks whenever htmlCode changes
  useEffect(() => {
    try {
      const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
      const bgRegex = /url\(["']?([^"')]+)["']?\)/gi;
      const matches = new Set<string>();

      let match: RegExpExecArray | null;
      while ((match = imgRegex.exec(htmlCode)) !== null) {
        if (match[1] && match[1].startsWith('http')) {
          matches.add(match[1]);
        }
      }
      while ((match = bgRegex.exec(htmlCode)) !== null) {
        if (match[1] && match[1].startsWith('http')) {
          matches.add(match[1]);
        }
      }

      setExtractedImages(Array.from(matches));
    } catch {
      // ignore parse errors
    }
  }, [htmlCode]);

  const handleSelectTemplate = (template: SampleTemplate) => {
    setSelectedTemplateId(template.id);
    setHtmlCode(template.htmlContent);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 space-y-5 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-indigo-400 uppercase">Screen 05 • HTML Studio</span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Live Screen & Hotlink Importer</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Paste any HTML snippet with hotlinked images to preview responsive screens in real time.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors border border-zinc-700"
          >
            {copiedCode ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{copiedCode ? 'Copied' : 'Copy HTML'}</span>
          </button>
        </div>
      </div>

      {/* Template Preset Selector */}
      <div className="bg-zinc-900/90 p-3 rounded-xl border border-zinc-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
            <Sparkles size={13} className="text-amber-400" />
            Quick Presets (or paste your own HTML below):
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            {extractedImages.length} hotlinks found
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SAMPLE_TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => handleSelectTemplate(tpl)}
              className={`p-2.5 rounded-lg text-left transition-all border ${
                selectedTemplateId === tpl.id
                  ? 'bg-indigo-950/60 border-indigo-500/60 text-white'
                  : 'bg-zinc-950 hover:bg-zinc-800/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div className="text-xs font-semibold truncate">{tpl.name}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">{tpl.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'preview'
                ? 'border-indigo-500 text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Play size={13} />
            <span>Interactive Screen Preview</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'code'
                ? 'border-indigo-500 text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileCode size={13} />
            <span>HTML Editor</span>
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'assets'
                ? 'border-indigo-500 text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ImageIcon size={13} />
            <span>Extracted Hotlinks ({extractedImages.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'preview' && (
        <div className="space-y-3">
          <div className="w-full h-[520px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl relative">
            <iframe
              title="Live HTML Screen Render"
              srcDoc={htmlCode}
              sandbox="allow-scripts"
              className="w-full h-full border-0 bg-transparent"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-500 px-1">
            <span>Rendered securely with sandboxed CSS & responsive hotlinks</span>
            <span className="font-mono">{extractedImages.length} image assets connected</span>
          </div>
        </div>
      )}

      {activeTab === 'code' && (
        <div className="space-y-3">
          <div className="relative">
            <textarea
              value={htmlCode}
              onChange={(e) => {
                setHtmlCode(e.target.value);
                setSelectedTemplateId('custom');
              }}
              rows={18}
              placeholder="Paste your HTML code here with hotlinked <img> tags..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-200 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 leading-relaxed resize-y shadow-inner"
              spellCheck={false}
            />
          </div>
          <p className="text-xs text-zinc-400">
            Tip: You can edit or paste any HTML snippet above. Changes will instantly re-render in the <strong>Preview</strong> tab and extract all hotlinked image URLs.
          </p>
        </div>
      )}

      {activeTab === 'assets' && (
        <div className="space-y-3">
          {extractedImages.length === 0 ? (
            <div className="text-center py-12 px-4 bg-zinc-900/40 rounded-xl border border-dashed border-zinc-800">
              <ImageIcon size={28} className="mx-auto text-zinc-600 mb-2" />
              <h4 className="text-sm font-medium text-zinc-300">No hotlinked images detected</h4>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                Paste HTML containing &lt;img src="https://..."&gt; or background-image styles to automatically extract CDN links.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {extractedImages.map((url, i) => {
                const isCopied = copiedUrl === url;
                return (
                  <div
                    key={`extracted-${i}`}
                    className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 flex items-center gap-3 group"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-950 shrink-0 border border-zinc-800">
                      <img
                        src={url}
                        alt={`Hotlink ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          // fallback if blocked
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-zinc-200 mb-0.5">Asset #{i + 1}</div>
                      <div className="text-[11px] text-zinc-400 font-mono truncate">{url}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleCopyUrl(url)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                            isCopied
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                          }`}
                        >
                          {isCopied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                          <span>{isCopied ? 'Copied' : 'Copy Link'}</span>
                        </button>
                        <a
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-zinc-400 hover:text-zinc-200"
                        >
                          <ExternalLink size={11} />
                          <span>View</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

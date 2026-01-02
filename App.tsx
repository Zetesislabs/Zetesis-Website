import React from 'react';
import Nav from './components/Nav';
import Section from './components/Section';
import D3CausalGraph from './components/D3CausalGraph';
import { 
    INTRO_TEXT, 
    ABOUT_TEXT, 
    FRAMEWORK_MATH, 
    SEPARATION_LAYERS,
    RESEARCH_DIRECTIONS,
    PEOPLE
} from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white">
      <Nav />

      {/* 0.0 Introduction / Abstract */}
      <section id="intro" className="pt-20 md:pt-32 border-b border-black">
        <div className="grid md:grid-cols-12 min-h-[60vh]">
            {/* Left: Branding & Generative Element */}
            <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-black relative bg-gray-50 flex flex-col">
                 <div className="flex-grow p-6 md:p-12 flex flex-col justify-end">
                    <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-none tracking-tight">
                        Zetesis<br/>Lab
                    </h1>
                    <div className="font-mono text-xs space-y-1">
                        <p>EST. 2025</p>
                        <p>LOC: ARTPARK @ IISc</p>
                        <p>MODE: INQUIRY_AS_PROCESS</p>
                    </div>
                 </div>
                 {/* The "Machine" / Diagram */}
                 <div className="h-64 md:h-80 border-t border-black relative">
                    <D3CausalGraph />
                 </div>
            </div>

            {/* Right: The Text (Manifesto) */}
            <div className="md:col-span-7 p-6 md:p-12 flex flex-col justify-center">
                <div className="prose prose-lg prose-p:font-light prose-p:text-black max-w-none">
                    {INTRO_TEXT.map((para, idx) => (
                        <p key={idx} className={idx === 0 ? "text-xl md:text-2xl font-serif leading-relaxed mb-8" : "text-base md:text-lg leading-relaxed mb-6 text-gray-800"}>
                            {para}
                        </p>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* 1.0 About */}
      <Section id="about" index="1.0" title="The Epistemic Gap">
          <div className="space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-8 border-b border-black pb-2 inline-block">
                  Problem Statement
              </div>
              {ABOUT_TEXT.map((para, idx) => (
                  <p key={idx} className="text-lg leading-relaxed font-light text-gray-800">
                      {para}
                  </p>
              ))}
          </div>
      </Section>

      {/* 2.0 Formal Framework */}
      <Section id="framework" index="2.0" title="Formal Framework">
          <div className="mb-16">
              <p className="text-lg italic font-serif mb-8 text-gray-600">
                  Zetesis is grounded in a formal framework for representing and reasoning with knowledge.
              </p>
              
              {/* Mathematical Integration */}
              <div className="grid gap-px bg-black border border-black mb-12">
                  {FRAMEWORK_MATH.map((item, i) => (
                      <div key={i} className="bg-white p-6 md:p-8">
                          <h4 className="font-mono text-sm font-bold mb-2">{item.term}</h4>
                          <p className="text-gray-700">{item.def}</p>
                      </div>
                  ))}
              </div>

              {/* Separation of Concerns */}
              <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-gray-200">
                  <div>
                      <h3 className="text-xl font-serif mb-4">Separation of Concerns</h3>
                      <p className="text-sm text-gray-600 mb-6">
                          Knowledge systems must explicitly distinguish between:
                      </p>
                      <ul className="space-y-4">
                          {SEPARATION_LAYERS.map((layer, i) => (
                              <li key={i} className="flex items-center gap-4 font-mono text-sm border border-black p-3">
                                  <span className="bg-black text-white w-6 h-6 flex items-center justify-center text-[10px]">
                                      L{i}
                                  </span>
                                  {layer}
                              </li>
                          ))}
                      </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif mb-4">Universal Representation Schema</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                        To operationalize this framework, we developed the URS, a process ontology that organizes information around invariance. URS allows the same data to support causal inference, symbolic simulation, and plausibility-based reasoning without retraining or schema redesign.
                    </p>
                  </div>
              </div>
          </div>
      </Section>

      {/* 3.0 Research Directions */}
      <Section id="research" index="3.0" title="Research Directions">
          <div className="space-y-0">
              {RESEARCH_DIRECTIONS.map((item, idx) => (
                  <div key={idx} className="group border-b border-gray-200 py-8 first:pt-0 hover:bg-gray-50 transition-colors -mx-6 px-6 md:-mx-12 md:px-12">
                      <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-4">
                          <span className="font-mono text-xs text-gray-400">RES-{String(idx + 1).padStart(2, '0')}</span>
                          <h3 className="text-xl font-bold font-serif">{item.title}</h3>
                      </div>
                      <div className="md:pl-20">
                          <p className="text-gray-600 leading-relaxed max-w-2xl">
                              {item.description}
                          </p>
                      </div>
                  </div>
              ))}
          </div>
      </Section>

      {/* 4.0 People */}
      <Section id="people" index="4.0" title="People">
          <div className="grid gap-12">
              {PEOPLE.map((person, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row gap-8 items-start pb-12 border-b border-gray-200 last:border-0">
                      <div className="md:w-1/3">
                          <div className="w-12 h-1 bg-black mb-4"></div>
                          <h3 className="text-2xl font-serif mb-2">{person.name}</h3>
                          <span className="font-mono text-xs uppercase text-gray-500">{person.role}</span>
                      </div>
                      <div className="md:w-2/3">
                          <p className="text-gray-800 leading-relaxed">
                              {person.description}
                          </p>
                      </div>
                  </div>
              ))}
          </div>
      </Section>

      {/* Footer */}
      <footer className="bg-white border-t border-black py-12 px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div>
                  <h2 className="text-lg font-serif font-bold mb-4">ZETESIS LAB</h2>
                  <p className="font-mono text-xs text-gray-500 max-w-xs">
                      Epistemic and computational infrastructure for constructing, validating, and operating knowledge-driven decision systems.
                  </p>
              </div>
              <div className="font-mono text-xs text-right">
                  <p>&copy; 2025 Zetesis Lab</p>
                  <p>ARTPARK @ IISc</p>
              </div>
          </div>
      </footer>
    </div>
  );
};

export default App;
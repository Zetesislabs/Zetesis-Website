import React from 'react';

interface SectionProps {
  id: string;
  index: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ 
    id, 
    index,
    title, 
    children, 
    className = ''
}) => {
  return (
    <section 
        id={id} 
        className={`relative border-t border-black ${className}`}
    >
        {/* Visible Construction: The Grid */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 border-r border-black bg-gray-50/50 hidden md:block">
            <span className="block p-4 font-mono text-xs font-bold sticky top-14">{index}</span>
        </div>

        <div className="md:ml-24 grid md:grid-cols-12 min-h-[50vh]">
            {/* Title Column */}
            <div className="md:col-span-4 p-6 md:p-12 border-b md:border-b-0 md:border-r border-black flex flex-col justify-between">
                <div>
                    <span className="md:hidden font-mono text-xs font-bold mb-2 block">{index}</span>
                    {title && (
                        <h2 className="text-3xl font-serif font-medium leading-tight sticky top-20">
                            {title}
                        </h2>
                    )}
                </div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-8 p-6 md:p-12">
                {children}
            </div>
        </div>
    </section>
  );
};

export default Section;
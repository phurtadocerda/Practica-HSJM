import React from 'react';
import BackButton from './BackButton';

const PageHeader = ({
  title,
  subtitle,
  badge,
  badgeIcon: BadgeIcon,
  showBackButton = true,
  backPath = '/inicio',
  backLabel = 'VOLVER AL INICIO',
  onBack,
  rightContent,
  icon: Icon,
  iconBg = 'bg-cyan-600'
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b pb-8">
      <div>
        {showBackButton && (
          <BackButton
            to={backPath}
            onClick={onBack}
            label={backLabel}
            className="mb-4 text-sm"
          />
        )}
        <div className="flex items-center gap-4">
          {Icon && (
            <div className={`${iconBg} p-3 rounded-2xl text-white shadow-lg `}>
              <Icon size={32} />
            </div>
          )}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">
              {title}
            </h2>
            {subtitle && (
              <p className="text-slate-400 font-bold uppercase tracking-widest mt-2 text-xs">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {rightContent}
        {badge && BadgeIcon && (
          <div className="flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-2 rounded-full text-xs font-bold border border-slate-100">
            <BadgeIcon size={16} className="text-[#00a19a]" /> {badge}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
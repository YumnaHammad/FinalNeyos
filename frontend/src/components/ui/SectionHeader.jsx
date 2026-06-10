import { motion } from 'framer-motion';

export default function SectionHeader({ badge, title, subtitle, align = 'center', light = false }) {
  const alignClass =
    align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col gap-4 mb-12 md:mb-16 max-w-3xl ${alignClass}`}
    >
      {badge && (
        <span
          className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.28em] ${
            light
              ? 'bg-white/10 text-teal-200 border border-white/20'
              : 'bg-[#006071]/10 text-[#006071] border border-[#006071]/15'
          }`}
        >
          {badge}
        </span>
      )}
      {title && (
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight ${
            light ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={`text-sm md:text-base leading-relaxed font-medium ${
            light ? 'text-white/75' : 'text-gray-500'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

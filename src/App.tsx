// @ts-nocheck
import React, { useState, useId } from 'react';
import {
  Home,
  Target,
  Award,
  Users,
  ChevronRight,
  Sparkles,
  ClipboardList,
  BarChart3,
  Star,
  Plus,
  X,
  ArrowRight,
  TrendingUp,
  LifeBuoy,
  AlertTriangle,
  ListChecks,
  MessageSquare,
  FolderOpen,
  Download,
  Bell,
  Mail,
  Copy,
  UserCheck,
  ShieldAlert,
  Activity,
  Flag,
  Timer,
  Clock,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

/* ---------------------------------- tokens ---------------------------------- */
const C = {
  navy: '#0E1B45',
  navyLight: '#16245C',
  orange: '#F2782F',
  orangeLight: '#FFA559',
  cream: '#F6F2E9',
  card: '#FFFFFF',
  ink: '#1B1F2A',
  sub: '#6B7280',
  green: '#1FA67A',
  amber: '#E2A33D',
  red: '#D1495B',
  gray: '#9CA3AF',
  blue: '#3B6FD4',
  purple: '#5B3FA0',
};
const GRAD = `linear-gradient(120deg, ${C.navy} 0%, #4B3C86 45%, ${C.orange} 100%)`;
const TODAY = '2026-06-30';
const SEMESTER_END = '2026-12-18';
const addDays = (d, n) => {
  const dt = new Date(d + 'T00:00:00');
  dt.setDate(dt.getDate() + n);
  return dt.toISOString().slice(0, 10);
};
const daysBetween = (a, b) =>
  Math.round(
    (new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000
  );
const TOMORROW = addDays(TODAY, 1);
const WEEK_END = addDays(TODAY, 7);
const MONTH_END = addDays(TODAY, 30);
const DIAS_SEMANA = daysBetween(TODAY, WEEK_END);
const DIAS_SEMESTRE = daysBetween(TODAY, SEMESTER_END);
const MESES = [
  'ene',
  'feb',
  'mar',
  'abr',
  'may',
  'jun',
  'jul',
  'ago',
  'sep',
  'oct',
  'nov',
  'dic',
];
const formatEs = (d) => {
  const [y, m, day] = d.split('-');
  return `${Number(day)} ${MESES[Number(m) - 1]} ${y}`;
};

/* ---------------------------------- data ---------------------------------- */
const CRITERIA = [
  { id: 'resultados', label: 'Resultados y metas' },
  { id: 'valores', label: 'Alineación con valores CESUMA' },
  { id: 'colaboracion', label: 'Colaboración' },
  { id: 'iniciativa', label: 'Iniciativa y mejora continua' },
];

const OBJETIVO_INSTITUCIONAL =
  'Democratizar el acceso a educación superior de calidad en LATAM';
const OBJETIVO_DEPTO = {
  'Marketing y Comunicación':
    'Aumentar la generación de leads calificados en 25% este semestre',
  Comercial: 'Incrementar la tasa de conversión de prospecto a inscrito en 10%',
  Atención:
    'Reducir el tiempo de resolución de trámites escolares a menos de 48h',
  Administración: 'Optimizar el ciclo de pagos a proveedores en 20%',
};

const STATUSES = [
  'Por Iniciar',
  'En Proceso',
  'En Revisión',
  'Bloqueado',
  'Completado',
];
const PRIORITIES = ['Alta', 'Media', 'Baja', 'Rutina', 'Nueva'];
const PRIORITY_COLOR = {
  Alta: C.red,
  Media: C.amber,
  Baja: C.green,
  Rutina: C.navy,
  Nueva: C.purple,
};
const STATUS_COLOR = {
  'Por Iniciar': C.gray,
  'En Proceso': C.blue,
  'En Revisión': C.purple,
  Bloqueado: C.red,
  Completado: C.green,
};

const TIERS = [
  {
    name: 'No satisfactorio',
    range: 'Menos de 65%',
    color: C.red,
    icon: AlertTriangle,
    benefits: ['Revisión inmediata de continuidad de contrato'],
  },
  {
    name: 'En programa de mejora',
    range: '65% – 79%',
    color: C.amber,
    icon: LifeBuoy,
    benefits: [
      'Ingreso a programa de mentoría estratégica',
      'Mentor asignado para fortalecer áreas de oportunidad',
    ],
  },
  {
    name: 'Talento en desarrollo',
    range: '80% – 100%',
    color: C.navy,
    icon: TrendingUp,
    benefits: [
      'Mantiene condiciones actuales',
      'Ruta clara para subir de nivel',
    ],
  },
  {
    name: 'Estrella CESUMA',
    range: '100% + mejora de proceso destacada',
    color: C.green,
    icon: Star,
    benefits: [
      'Flexibilidad de horario',
      'Más días de home office',
      'Bonos y prestaciones especiales',
    ],
  },
];

const RECURSOS = [
  {
    nombre: 'Manifiesto de Cultura',
    formato: 'PDF interactivo',
    responsable: 'EMC (Oscar Narváez)',
  },
  {
    nombre: 'PDI / Modelo educativo',
    formato: 'Guía digital',
    responsable: 'Dirección Académica',
  },
  {
    nombre: 'Manual de Identidad (logos)',
    formato: 'Brand Kit (.zip)',
    responsable: 'Marketing Creativo',
  },
  {
    nombre: 'Guías de Ejecución Rápida',
    formato: 'Checklist',
    responsable: 'Mejora Continua',
  },
];

const ROOMS = [
  {
    id: 'general',
    label: '#general 📣',
    desc: 'Avisos y noticias para todo CESUMA.',
  },
  {
    id: 'flash-operaciones',
    label: '#flash-operaciones 🚦',
    desc: 'Cada líder cuenta: qué hubo la semana pasada, qué viene esta semana y qué necesita de otras áreas.',
  },
  {
    id: 'tips-del-dia',
    label: '#tips-del-dia 💡',
    desc: 'Tips rápidos y buenas prácticas del día a día.',
  },
  {
    id: 'exitos-cesuma',
    label: '#exitos-cesuma 🎉',
    desc: 'Para celebrar juntos cada logro, grande o chiquito.',
  },
  {
    id: 'vida-cesuma',
    label: '#vida-cesuma ☕',
    desc: 'Recomendaciones, memes, cumpleaños y todo lo que no es trabajo (pero también importa).',
  },
];

const AUTHOR_INFO = {
  'Pablo Lamamié de Clairac': 'Rector',
  'Heldrich Santizo':
    'Jefe de Marketing y Comunicación · Marketing y Comunicación',
  'Pilar Alcocer': 'Directora de Servicios Escolares · Atención',
  'Karen Argüelles': 'Asesora de Ventas · Comercial',
  'Diego Fuentes': 'Analista de Operaciones · Administración',
  'Jacobo Elordi': 'Creative Performance Manager · Marketing y Comunicación',
};
const AVATAR_PALETTE = [C.navy, C.orange, C.purple, C.blue, C.green, '#A0522D'];
const avatarColor = (name) => {
  let h = 0;
  for (const ch of name)
    h = (h * 31 + ch.charCodeAt(0)) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[h];
};

const INITIAL_MESSAGES = [
  {
    id: 1,
    room: 'general',
    author: 'Pilar Alcocer',
    text: '¡Buenos días, equipo! 🌞 Una bienvenida calurosa a quienes se nos unen esta semana, qué gusto seguir creciendo juntos. Mi oficina (real y virtual 😄) siempre está abierta si necesitan algo.',
    reactions: { '❤️': 6 },
  },
  {
    id: 2,
    room: 'general',
    author: 'Heldrich Santizo',
    text: 'Subí las nuevas pautas de marca 2026 a la carpeta de Marketing 🎨 quedaron hermosas, échenles un ojo cuando puedan.',
    reactions: { '👏': 3 },
  },
  {
    id: 3,
    room: 'flash-operaciones',
    author: 'Heldrich Santizo',
    text: '📈 La semana pasada: lanzamos la campaña de verano y bajamos el CPA 8%.\n🎯 Esta semana: terminamos la segmentación por buyer persona y entregamos el reporte semanal.\n🤝 Necesitamos: que Atención nos confirme el dato actualizado de matrícula para ajustar el mensaje 🙏',
    reactions: {},
  },
  {
    id: 4,
    room: 'flash-operaciones',
    author: 'Karen Argüelles',
    text: '📈 La semana pasada: cerramos 5 inscripciones nuevas, vamos avanzando 💪\n🎯 Esta semana: enfocarnos en reducir el tiempo de respuesta a prospectos.\n🤝 Necesitamos: el material actualizado de Marketing para las llamadas de seguimiento.',
    reactions: { '👏': 2 },
  },
  {
    id: 5,
    room: 'flash-operaciones',
    author: 'Pilar Alcocer',
    text: '📈 La semana pasada: bajamos el tiempo de resolución de trámites a 36h ⏱️\n🎯 Esta semana: capacitar al equipo en el nuevo flujo digital.\n🤝 Necesitamos: nada por ahora, ¡vamos bien! 🙌',
    reactions: {},
  },
  {
    id: 6,
    room: 'flash-operaciones',
    author: 'Diego Fuentes',
    text: '📈 La semana pasada: cerramos la conciliación de junio un día antes.\n🎯 Esta semana: levantar el proceso actual para automatizar pagos.\n🤝 Necesitamos: 30 minutos de algún compañero de TI para revisar herramientas, si alguien puede ayudar avisen por aquí 🙋',
    reactions: {},
  },
  {
    id: 7,
    room: 'tips-del-dia',
    author: 'Jacobo Elordi',
    text: '💡 Tip del día: agrupar las campañas por buyer persona antes de optimizar presupuesto ahorra horas de análisis. Lo aprendí a la mala esta semana 😅',
    reactions: { '❤️': 1 },
  },
  {
    id: 8,
    room: 'exitos-cesuma',
    author: 'Pilar Alcocer',
    text: '🎉 ¡Bajamos el tiempo de resolución de trámites a 36h esta semana! Gracias equipo, esto se siente increíble.',
    reactions: { '❤️': 5, '👏': 4 },
  },
  {
    id: 9,
    room: 'vida-cesuma',
    author: 'Karen Argüelles',
    text: '☕ Recomendación viernes: si no han probado el café de la esquina de la oficina, se están perdiendo de algo bueno. ¡Feliz finde a todos! 🎶',
    reactions: { '😂': 2 },
  },
  {
    id: 10,
    room: 'vida-cesuma',
    author: 'Heldrich Santizo',
    text: '🎂 ¡Hoy es cumpleaños de Jacobo! Pásense por su escritorio a saludarlo 🥳',
    reactions: { '❤️': 8 },
  },
];

const INITIAL_COLLABORATORS = [
  {
    id: 1,
    name: 'Jacobo Elordi',
    puesto: 'Creative Performance Manager',
    area: 'Marketing y Comunicación',
    objetivoIndividual: {
      title:
        'Reducir el costo por adquisición de campañas pagadas de $450 a $380 (-15%)',
      keyResults: [
        {
          id: 101,
          label: 'Auditar estructura de campañas activas',
          progress: 100,
          progressLider: null,
        },
        {
          id: 102,
          label: 'Implementar segmentación por buyer persona',
          progress: 60,
          progressLider: null,
        },
        {
          id: 103,
          label: 'Reducir CPA de $450 a $380',
          progress: 45,
          progressLider: null,
        },
        {
          id: 104,
          label: 'Documentar guía de optimización para el equipo',
          progress: 0,
          progressLider: null,
        },
      ],
    },
    evaluacion: { estado: 'pendiente', autoeval: {}, managerEval: {} },
    mentorAsignado: null,
    revisionContinuidad: false,
    estrellaCesuma: false,
    mejoraDescripcion: '',
  },
  {
    id: 2,
    name: 'Karen Argüelles',
    puesto: 'Asesora de Ventas',
    area: 'Comercial',
    objetivoIndividual: {
      title:
        'Cerrar 15 inscripciones nuevas este semestre con seguimiento personalizado',
      keyResults: [
        {
          id: 201,
          label: 'Actualizar CRM con seguimiento diario',
          progress: 80,
          progressLider: 75,
        },
        {
          id: 202,
          label: 'Reducir tiempo de respuesta a prospectos a <2h',
          progress: 50,
          progressLider: 45,
        },
        {
          id: 203,
          label: 'Cerrar 15 inscripciones nuevas',
          progress: 33,
          progressLider: null,
        },
      ],
    },
    evaluacion: {
      estado: 'calibracion',
      autoeval: { resultados: 4, valores: 5, colaboracion: 4, iniciativa: 4 },
      managerEval: {},
    },
    mentorAsignado: null,
    revisionContinuidad: false,
    estrellaCesuma: false,
    mejoraDescripcion: '',
  },
  {
    id: 3,
    name: 'Pilar Alcocer',
    puesto: 'Directora de Servicios Escolares',
    area: 'Atención',
    objetivoIndividual: {
      title:
        'Reducir el tiempo de resolución de trámites escolares a menos de 48 horas',
      keyResults: [
        {
          id: 301,
          label: 'Mapear proceso actual',
          progress: 100,
          progressLider: 100,
        },
        {
          id: 302,
          label: 'Implementar formulario digital',
          progress: 100,
          progressLider: 100,
        },
        {
          id: 303,
          label: 'Capacitar equipo en nuevo flujo',
          progress: 100,
          progressLider: 100,
        },
      ],
    },
    evaluacion: {
      estado: 'cerrada',
      autoeval: { resultados: 5, valores: 5, colaboracion: 5, iniciativa: 5 },
      managerEval: {
        resultados: 5,
        valores: 5,
        colaboracion: 5,
        iniciativa: 5,
      },
    },
    mentorAsignado: null,
    revisionContinuidad: false,
    estrellaCesuma: false,
    mejoraDescripcion: '',
  },
  {
    id: 4,
    name: 'Diego Fuentes',
    puesto: 'Analista de Operaciones',
    area: 'Administración',
    objetivoIndividual: {
      title:
        'Reducir en 30% el tiempo del proceso de conciliación de pagos a proveedores',
      keyResults: [
        {
          id: 401,
          label: 'Levantamiento de proceso actual',
          progress: 20,
          progressLider: null,
        },
        {
          id: 402,
          label: 'Seleccionar herramienta de automatización',
          progress: 0,
          progressLider: null,
        },
        {
          id: 403,
          label: 'Piloto con 5 proveedores',
          progress: 0,
          progressLider: null,
        },
      ],
    },
    evaluacion: {
      estado: 'pendiente',
      autoeval: { resultados: 2, valores: 3, colaboracion: 2, iniciativa: 2 },
      managerEval: {
        resultados: 2,
        valores: 2,
        colaboracion: 3,
        iniciativa: 2,
      },
    },
    mentorAsignado: null,
    revisionContinuidad: false,
    nuevoIngreso: true,
    estrellaCesuma: false,
    mejoraDescripcion: '',
  },
];

const INITIAL_TASKS = [
  {
    id: 1,
    title: 'Diseñar creatividades campaña Q3',
    responsableId: 1,
    priority: 'Alta',
    status: 'En Proceso',
    fecha: '2026-07-10',
    area: 'Marketing y Comunicación',
    liderRevision: 'Heldrich Santizo',
    linkInsumos: '',
    detalle: '',
  },
  {
    id: 2,
    title: 'Reportar métricas semanales de campañas',
    responsableId: 1,
    priority: 'Rutina',
    status: 'Por Iniciar',
    fecha: '2026-06-25',
    area: 'Marketing y Comunicación',
    liderRevision: 'Heldrich Santizo',
    linkInsumos: '',
    detalle: '',
  },
  {
    id: 3,
    title: 'Actualizar guion de llamadas de venta',
    responsableId: 2,
    priority: 'Alta',
    status: 'En Revisión',
    fecha: '2026-07-03',
    area: 'Comercial',
    liderRevision: '',
    linkInsumos: '',
    detalle: '',
  },
  {
    id: 4,
    title: 'Dar seguimiento a 10 prospectos activos',
    responsableId: 2,
    priority: 'Alta',
    status: 'En Proceso',
    fecha: '2026-07-01',
    area: 'Comercial',
    liderRevision: '',
    linkInsumos: '',
    detalle: '',
  },
  {
    id: 5,
    title: 'Capacitar equipo en nuevo flujo de trámites',
    responsableId: 3,
    priority: 'Media',
    status: 'Completado',
    fecha: '2026-06-20',
    area: 'Atención',
    liderRevision: '',
    linkInsumos: '',
    detalle: '',
  },
  {
    id: 6,
    title: 'Auditar tiempos de respuesta a estudiantes',
    responsableId: 3,
    priority: 'Baja',
    status: 'Bloqueado',
    fecha: '2026-06-30',
    area: 'Atención',
    liderRevision: '',
    linkInsumos: '',
    detalle: '',
  },
  {
    id: 7,
    title: 'Levantamiento de proceso de pagos',
    responsableId: 4,
    priority: 'Alta',
    status: 'Por Iniciar',
    fecha: '2026-07-12',
    area: 'Administración',
    liderRevision: '',
    linkInsumos: '',
    detalle: '',
  },
  {
    id: 8,
    title: 'Cotizar herramienta de automatización',
    responsableId: 4,
    priority: 'Nueva',
    status: 'Bloqueado',
    fecha: '2026-06-28',
    area: 'Administración',
    liderRevision: '',
    linkInsumos: 'Esperando cotización de 2 proveedores',
    detalle: '',
  },
  {
    id: 9,
    title: 'Publicar reporte semanal de redes sociales',
    responsableId: 1,
    priority: 'Rutina',
    status: 'En Proceso',
    fecha: '2026-07-02',
    area: 'Marketing y Comunicación',
    liderRevision: '',
    linkInsumos: '',
    detalle: '',
  },
];

const ADMIN_NAME = 'Heldrich Santizo';

/* ---------------------------------- helpers ---------------------------------- */
const krOficial = (kr) =>
  kr.progressLider != null ? kr.progressLider : kr.progress;
const objetivoPct = (c) => {
  const k = c.objetivoIndividual.keyResults;
  return k.length
    ? Math.round(k.reduce((a, x) => a + krOficial(x), 0) / k.length)
    : 0;
};
const tasksOf = (tasks, id) => tasks.filter((t) => t.responsableId === id);
const taskPct = (tasks, id) => {
  const m = tasksOf(tasks, id);
  return m.length
    ? Math.round(
        (m.filter((t) => t.status === 'Completado').length / m.length) * 100
      )
    : 0;
};
const isOverdue = (t) => t.fecha < TODAY && t.status !== 'Completado';
const isToday = (t) => t.fecha === TODAY && t.status !== 'Completado';
const isTomorrow = (t) => t.fecha === TOMORROW && t.status !== 'Completado';
const isThisWeek = (t) =>
  t.fecha >= TODAY && t.fecha <= WEEK_END && t.status !== 'Completado';
const collabTag = (c) => `${c.puesto} · ${c.area}`;

const pctInWindow = (tasks, id, start, end) => {
  const set = tasksOf(tasks, id).filter(
    (t) => t.fecha !== '—' && t.fecha >= start && t.fecha <= end
  );
  if (!set.length) return null;
  return Math.round(
    (set.filter((t) => t.status === 'Completado').length / set.length) * 100
  );
};
const cumplimientoSemanal = (tasks, id) =>
  pctInWindow(tasks, id, TODAY, WEEK_END) ?? taskPct(tasks, id);
const cumplimientoMensual = (tasks, id) =>
  pctInWindow(tasks, id, TODAY, MONTH_END) ?? taskPct(tasks, id);
const semaforo = (pct) => (pct >= 80 ? C.green : pct >= 50 ? C.amber : C.red);

const evalAvg = (ev) => {
  const vals = CRITERIA.map((cr) => {
    const a = ev.autoeval[cr.id] || 0;
    const m = ev.managerEval[cr.id] || 0;
    return a && m ? (a + m) / 2 : a || m || 0;
  }).filter((v) => v > 0);
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
};
const tierIndex = (avg) => {
  if (avg === 0) return -1;
  const pct = (avg / 5) * 100;
  if (pct >= 80) return 2;
  if (pct >= 65) return 1;
  return 0;
};
const finalTierIdx = (c) => {
  const base = tierIndex(evalAvg(c.evaluacion));
  return c.estrellaCesuma && base === 2 ? 3 : base;
};

const ESTADO_LABEL = {
  pendiente: 'Autoevaluación pendiente',
  calibracion: 'En calibración con líder',
  cerrada: 'Cerrada',
};
const ESTADO_COLOR = {
  pendiente: C.amber,
  calibracion: C.orange,
  cerrada: C.green,
};

/* ---------------------------------- ui atoms ---------------------------------- */
function ProgressRing({ value, size = 76, stroke = 8 }) {
  const id = useId();
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(100, Math.max(0, value)) / 100) * circ;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.navy} />
            <stop offset="100%" stopColor={C.orange} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#E7E2D4"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#${id})`}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center font-bold text-sm"
        style={{ color: C.navy }}
      >
        {value}%
      </div>
    </div>
  );
}
function GaugeRing({ value, size = 140, stroke = 14, label }) {
  const color = semaforo(value);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(100, Math.max(0, value)) / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="#E7E2D4"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.4s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-3xl font-extrabold" style={{ color }}>
            {value}%
          </div>
        </div>
      </div>
      {label && (
        <div
          className="text-xs mt-2 text-center font-semibold max-w-[160px]"
          style={{ color: C.sub }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
function ComplianceStrip({ tasks, collabId, objetivoPctValue }) {
  const semanal = cumplimientoSemanal(tasks, collabId);
  const mensual = cumplimientoMensual(tasks, collabId);
  const items = [
    ['Esta semana', semanal],
    ['Este mes', mensual],
    ['Este semestre', objetivoPctValue],
  ];
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {items.map(([label, val]) => (
        <Card key={label} className="text-center">
          <div
            className="text-3xl font-extrabold"
            style={{ color: semaforo(val) }}
          >
            {val}%
          </div>
          <div className="text-xs mt-1" style={{ color: C.sub }}>
            {label} · cumplimiento
          </div>
        </Card>
      ))}
    </div>
  );
}
function TimeBanner({ children }) {
  return (
    <div
      className="rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 mb-4"
      style={{ background: `${C.blue}14`, color: C.blue }}
    >
      <Clock size={15} /> {children}
    </div>
  );
}
function Badge({ children, color = C.navy, bg }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ color, background: bg || `${color}1A` }}
    >
      {children}
    </span>
  );
}
function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl p-5 ${className}`}
      style={{
        background: C.card,
        boxShadow:
          '0 1px 3px rgba(14,27,69,0.08), 0 1px 2px rgba(14,27,69,0.06)',
      }}
    >
      {children}
    </div>
  );
}
function SectionTitle({ icon: Icon, children, sub }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      {Icon && (
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${C.navy}10` }}
        >
          <Icon size={18} style={{ color: C.navy }} />
        </div>
      )}
      <div>
        <h2 className="text-lg font-bold" style={{ color: C.navy }}>
          {children}
        </h2>
        {sub && (
          <p className="text-sm" style={{ color: C.sub }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}
function MiniBar({ value, color = C.orange }) {
  return (
    <div className="w-full h-2 rounded-full" style={{ background: '#E7E2D4' }}>
      <div
        className="h-2 rounded-full"
        style={{
          width: `${value}%`,
          background: color,
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
}

function TierLadder({ avg, idx }) {
  const realIdxValue = idx != null ? idx : tierIndex(avg);
  return (
    <div className="space-y-3">
      {[...TIERS].reverse().map((t) => {
        const realIdx = TIERS.indexOf(t);
        const current = realIdx === realIdxValue;
        return (
          <div
            key={t.name}
            className="rounded-xl p-4 flex items-start gap-4 border-2"
            style={{
              borderColor: current ? t.color : '#E7E2D4',
              background: current ? `${t.color}0D` : 'white',
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: `${t.color}1A` }}
            >
              <t.icon size={20} style={{ color: t.color }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold" style={{ color: t.color }}>
                  {t.name}
                </span>
                <span className="text-xs" style={{ color: C.sub }}>
                  · {t.range}
                </span>
                {current && <Badge color={t.color}>Tú estás aquí</Badge>}
              </div>
              <ul
                className="text-sm mt-1.5 space-y-0.5"
                style={{ color: C.ink }}
              >
                {t.benefits.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------- recursos ---------------------------------- */
function Recursos() {
  return (
    <Card>
      <SectionTitle
        icon={FolderOpen}
        sub="Documentos clave que ya firmaste o revisaste en tu inducción."
      >
        Maletín digital
      </SectionTitle>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="text-left border-b"
              style={{ borderColor: '#E7E2D4' }}
            >
              <th className="py-2 pr-4 font-semibold" style={{ color: C.sub }}>
                Activo
              </th>
              <th className="py-2 pr-4 font-semibold" style={{ color: C.sub }}>
                Formato
              </th>
              <th className="py-2 pr-4 font-semibold" style={{ color: C.sub }}>
                Responsable
              </th>
              <th
                className="py-2 pr-4 font-semibold"
                style={{ color: C.sub }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {RECURSOS.map((r) => (
              <tr
                key={r.nombre}
                className="border-b last:border-0"
                style={{ borderColor: '#F1EDE0' }}
              >
                <td
                  className="py-3 pr-4 font-semibold"
                  style={{ color: C.navy }}
                >
                  {r.nombre}
                </td>
                <td className="py-3 pr-4" style={{ color: C.sub }}>
                  {r.formato}
                </td>
                <td className="py-3 pr-4" style={{ color: C.sub }}>
                  {r.responsable}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className="inline-flex items-center gap-1 text-xs font-bold"
                    style={{ color: C.orange }}
                  >
                    <Download size={14} /> Ver
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* ---------------------------------- intranet / foro ---------------------------------- */
function ChatBubble({ m, onReact }) {
  const role = AUTHOR_INFO[m.author] || '';
  return (
    <div className="flex gap-3">
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-extrabold text-white shrink-0"
        style={{ background: avatarColor(m.author) }}
      >
        {m.author[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="rounded-2xl rounded-tl-sm p-4"
          style={{ background: C.cream }}
        >
          <div className="flex items-baseline gap-2 mb-1.5 flex-wrap">
            <span className="text-base font-bold" style={{ color: C.navy }}>
              {m.author}
            </span>
            {role && (
              <span className="text-xs" style={{ color: C.sub }}>
                {role}
              </span>
            )}
          </div>
          <div
            className="text-[15px] leading-relaxed whitespace-pre-line"
            style={{ color: C.ink }}
          >
            {m.text}
          </div>
        </div>
        <div className="flex gap-1.5 mt-2 ml-1">
          {['❤️', '👏', '😂'].map((e) => (
            <button
              key={e}
              onClick={() => onReact(m.id, e)}
              className="text-sm px-2.5 py-1 rounded-full"
              style={{ background: 'white', border: '1px solid #E7E2D4' }}
            >
              {e} {m.reactions?.[e] || ''}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
function Intranet({ messages, onPost, onReact, viewerName }) {
  const [room, setRoom] = useState('general');
  const [text, setText] = useState('');
  const roomInfo = ROOMS.find((r) => r.id === room);
  const submit = () => {
    if (!text.trim()) return;
    onPost({
      id: Date.now(),
      room,
      author: viewerName,
      text: text.trim(),
      reactions: {},
    });
    setText('');
  };
  return (
    <Card>
      <SectionTitle
        icon={MessageSquare}
        sub="Comunicación interna por salas, sin barreras entre áreas. 💬"
      >
        Intranet CESUMA
      </SectionTitle>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-36 shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
          {ROOMS.map((r) => (
            <button
              key={r.id}
              onClick={() => setRoom(r.id)}
              className="text-left px-2.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap"
              style={
                room === r.id
                  ? { background: C.navy, color: 'white' }
                  : { color: C.ink, background: C.cream }
              }
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs mb-3" style={{ color: C.sub }}>
            {roomInfo.desc}
          </p>
          <div className="space-y-6 mb-4 max-h-[32rem] overflow-y-auto pr-1">
            {messages
              .filter((m) => m.room === room)
              .map((m) => (
                <ChatBubble key={m.id} m={m} onReact={onReact} />
              ))}
            {messages.filter((m) => m.room === room).length === 0 && (
              <p className="text-sm" style={{ color: C.sub }}>
                Sé el primero en publicar aquí 👋
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Cuéntale al equipo cómo va tu semana... 😊"
              className="flex-1 rounded-full px-4 py-3 text-sm border"
              style={{ borderColor: '#E7E2D4' }}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
            />
            <button
              onClick={submit}
              className="px-5 py-3 rounded-full text-sm font-bold text-white"
              style={{ background: C.orange }}
            >
              Publicar
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ---------------------------------- task board ---------------------------------- */
function RemindersPanel({ tasks, collabs }) {
  const [selected, setSelected] = useState([]);
  const [emailText, setEmailText] = useState('');
  const tagOf = (id) => {
    const c = collabs.find((x) => x.id === id);
    return c ? `${c.name} (${c.puesto} · ${c.area})` : '—';
  };
  const urgentes = tasks.filter(
    (t) => isOverdue(t) || isToday(t) || isTomorrow(t)
  );
  const semana = tasks.filter((t) => isThisWeek(t) && !urgentes.includes(t));
  const toggle = (id) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  const generar = () => {
    const chosen = tasks.filter((t) => selected.includes(t.id));
    const lines = chosen
      .map((t) => `- ${tagOf(t.responsableId)}: ${t.title} (vence: ${t.fecha})`)
      .join('\n');
    setEmailText(
      `Hola equipo,\n\nEstos son los pendientes que necesitan atención:\n\n${lines}\n\nGracias por su apoyo.\nCESUMA · Mejora Continua`
    );
  };
  return (
    <Card>
      <SectionTitle
        icon={Bell}
        sub="Vencidas, urgentes (próximas 48h) y de esta semana."
      >
        Recordatorios de entrega
      </SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <div
            className="text-xs font-bold uppercase tracking-wide mb-2"
            style={{ color: C.red }}
          >
            ⚠️ Vencidas o urgentes
          </div>
          <div className="space-y-1.5">
            {urgentes.length === 0 && (
              <p className="text-xs" style={{ color: C.sub }}>
                Sin pendientes urgentes.
              </p>
            )}
            {urgentes.map((t) => (
              <label
                key={t.id}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(t.id)}
                  onChange={() => toggle(t.id)}
                />
                <span style={{ color: C.ink }}>
                  {t.title} —{' '}
                  <span style={{ color: C.sub }}>
                    {tagOf(t.responsableId)}, vence {t.fecha}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <div
            className="text-xs font-bold uppercase tracking-wide mb-2"
            style={{ color: C.navy }}
          >
            📅 Esta semana
          </div>
          <div className="space-y-1.5">
            {semana.length === 0 && (
              <p className="text-xs" style={{ color: C.sub }}>
                Nada más esta semana.
              </p>
            )}
            {semana.map((t) => (
              <label
                key={t.id}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(t.id)}
                  onChange={() => toggle(t.id)}
                />
                <span style={{ color: C.ink }}>
                  {t.title} —{' '}
                  <span style={{ color: C.sub }}>
                    {tagOf(t.responsableId)}, vence {t.fecha}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={generar}
        disabled={!selected.length}
        className="px-4 py-2 rounded-full text-xs font-bold text-white inline-flex items-center gap-1.5 disabled:opacity-40"
        style={{ background: C.navy }}
      >
        <Mail size={14} /> Generar recordatorio por correo
      </button>
      {emailText && (
        <div className="mt-4">
          <textarea
            readOnly
            value={emailText}
            rows={6}
            className="w-full rounded-lg px-3 py-2 text-sm border font-mono"
            style={{ borderColor: '#E7E2D4' }}
          />
          <button
            onClick={() =>
              navigator.clipboard && navigator.clipboard.writeText(emailText)
            }
            className="mt-2 px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5"
            style={{ color: C.navy, background: C.cream }}
          >
            <Copy size={13} /> Copiar
          </button>
        </div>
      )}
    </Card>
  );
}

function TaskBoard({
  tasks,
  collabs,
  scopeId,
  canAssignOthers,
  onChangeStatus,
  onAddTask,
}) {
  const [filterCollab, setFilterCollab] = useState('todos');
  const [view, setView] = useState('todas');
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [form, setForm] = useState({
    title: '',
    responsableId: scopeId || collabs[0]?.id,
    priority: 'Media',
    fecha: '',
    area: '',
    liderRevision: '',
    linkInsumos: '',
    detalle: '',
  });

  let visible = scopeId
    ? tasks.filter((t) => t.responsableId === scopeId)
    : filterCollab === 'todos'
    ? tasks
    : tasks.filter((t) => t.responsableId === Number(filterCollab));
  if (view === 'hoy') visible = visible.filter(isToday);
  if (view === 'manana') visible = visible.filter(isTomorrow);
  if (view === 'semana') visible = visible.filter(isThisWeek);
  if (view === 'vencidas') visible = visible.filter(isOverdue);

  const collabOf = (id) => collabs.find((c) => c.id === id);
  const submit = () => {
    if (!form.title.trim()) return;
    onAddTask({
      id: Date.now(),
      title: form.title.trim(),
      responsableId: Number(form.responsableId),
      priority: form.priority,
      status: 'Por Iniciar',
      fecha: form.fecha || '—',
      area: form.area,
      liderRevision: form.liderRevision,
      linkInsumos: form.linkInsumos,
      detalle: form.detalle,
    });
    setForm({
      ...form,
      title: '',
      fecha: '',
      area: '',
      liderRevision: '',
      linkInsumos: '',
      detalle: '',
    });
    setOpen(false);
    setShowMore(false);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <SectionTitle icon={ListChecks} sub="Tablero de actividades en curso.">
          Actividades
        </SectionTitle>
        <div className="flex items-center gap-2 flex-wrap">
          {!scopeId && (
            <select
              value={filterCollab}
              onChange={(e) => setFilterCollab(e.target.value)}
              className="rounded-lg px-2.5 py-2 text-xs border"
              style={{ borderColor: '#E7E2D4' }}
            >
              <option value="todos">Todo el equipo</option>
              {collabs.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.puesto}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 rounded-full text-xs font-bold text-white inline-flex items-center gap-1"
            style={{ background: C.orange }}
          >
            <Plus size={14} /> Nueva actividad
          </button>
        </div>
      </div>

      <div className="flex gap-1.5 mb-4 flex-wrap">
        {[
          ['todas', 'Todas'],
          ['hoy', 'Hoy'],
          ['manana', 'Mañana'],
          ['semana', 'Esta semana'],
          ['vencidas', '⚠️ Vencidas'],
        ].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setView(k)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold"
            style={
              view === k
                ? { background: C.navy, color: 'white' }
                : { background: C.cream, color: C.ink }
            }
          >
            {l}
          </button>
        ))}
      </div>

      {open && (
        <div
          className="rounded-xl p-4 mb-5 flex flex-col gap-2"
          style={{ background: C.cream }}
        >
          <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Título de la actividad..."
              className="flex-1 min-w-[180px] rounded-lg px-3 py-2 text-sm border"
              style={{ borderColor: '#E7E2D4' }}
            />
            {canAssignOthers && (
              <select
                value={form.responsableId}
                onChange={(e) =>
                  setForm({ ...form, responsableId: e.target.value })
                }
                className="rounded-lg px-3 py-2 text-sm border"
                style={{ borderColor: '#E7E2D4' }}
              >
                {collabs.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.puesto}
                  </option>
                ))}
              </select>
            )}
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="rounded-lg px-3 py-2 text-sm border"
              style={{ borderColor: '#E7E2D4' }}
            >
              {PRIORITIES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <input
              type="date"
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              className="rounded-lg px-3 py-2 text-sm border"
              style={{ borderColor: '#E7E2D4' }}
            />
          </div>
          {!showMore ? (
            <button
              onClick={() => setShowMore(true)}
              className="text-xs font-bold self-start"
              style={{ color: C.navy }}
            >
              + más detalles (área, líder de revisión, link de insumos)
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
              <input
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                placeholder="Área / proyecto"
                className="flex-1 min-w-[140px] rounded-lg px-3 py-2 text-sm border"
                style={{ borderColor: '#E7E2D4' }}
              />
              <input
                value={form.liderRevision}
                onChange={(e) =>
                  setForm({ ...form, liderRevision: e.target.value })
                }
                placeholder="Líder de revisión"
                className="flex-1 min-w-[140px] rounded-lg px-3 py-2 text-sm border"
                style={{ borderColor: '#E7E2D4' }}
              />
              <input
                value={form.linkInsumos}
                onChange={(e) =>
                  setForm({ ...form, linkInsumos: e.target.value })
                }
                placeholder="Link de insumos"
                className="flex-1 min-w-[140px] rounded-lg px-3 py-2 text-sm border"
                style={{ borderColor: '#E7E2D4' }}
              />
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={submit}
              className="px-4 py-2 rounded-lg text-sm font-bold text-white"
              style={{ background: C.navy }}
            >
              Agregar
            </button>
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-lg text-sm"
              style={{ color: C.sub }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {STATUSES.map((status) => (
          <div
            key={status}
            className="rounded-xl p-3"
            style={{
              background: C.cream,
              minHeight: 120,
              borderTop: `3px solid ${STATUS_COLOR[status]}`,
            }}
          >
            <div
              className="text-xs font-bold uppercase tracking-wide mb-2 flex items-center justify-between"
              style={{ color: STATUS_COLOR[status] }}
            >
              {status}
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px]"
                style={{ background: 'white', color: C.sub }}
              >
                {visible.filter((t) => t.status === status).length}
              </span>
            </div>
            <div className="space-y-2">
              {visible
                .filter((t) => t.status === status)
                .map((t) => {
                  const resp = collabOf(t.responsableId);
                  return (
                    <div
                      key={t.id}
                      className="rounded-lg p-3 bg-white"
                      style={{
                        boxShadow: '0 1px 2px rgba(14,27,69,0.08)',
                        borderLeft: `4px solid ${STATUS_COLOR[t.status]}`,
                      }}
                    >
                      <div
                        className="text-sm font-semibold mb-1.5"
                        style={{ color: C.ink }}
                      >
                        {t.title}
                      </div>
                      <div className="flex items-center justify-between mb-1.5">
                        <Badge color={PRIORITY_COLOR[t.priority]}>
                          {t.priority}
                        </Badge>
                        <span
                          className="text-[11px]"
                          style={{ color: isOverdue(t) ? C.red : C.sub }}
                        >
                          {t.fecha}
                        </span>
                      </div>
                      {!scopeId && resp && (
                        <div className="text-[11px] mb-2">
                          <span
                            className="font-semibold"
                            style={{ color: C.navy }}
                          >
                            {resp.name}
                          </span>
                          <span style={{ color: C.sub }}>
                            {' '}
                            · {resp.puesto}, {resp.area}
                          </span>
                        </div>
                      )}
                      {t.liderRevision && (
                        <div
                          className="text-[11px] mb-2"
                          style={{ color: C.sub }}
                        >
                          Revisa: {t.liderRevision}
                        </div>
                      )}
                      <select
                        value={t.status}
                        onChange={(e) => onChangeStatus(t.id, e.target.value)}
                        className="w-full text-xs rounded-md px-2 py-1.5 border font-semibold"
                        style={{
                          borderColor: '#E7E2D4',
                          color: STATUS_COLOR[t.status],
                        }}
                      >
                        {STATUSES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------------------------------- colaborador ---------------------------------- */
function MisActividadesResumen({ tasks, collabId }) {
  const mine = tasksOf(tasks, collabId);
  const completadas = mine.filter((t) => t.status === 'Completado').length;
  const pct = mine.length ? Math.round((completadas / mine.length) * 100) : 0;
  return (
    <Card>
      <TimeBanner>
        Quedan {DIAS_SEMANA} días para el cierre de esta semana de actividades
        (corte: {formatEs(WEEK_END)}).
      </TimeBanner>
      <div className="flex items-center gap-5 flex-wrap">
        <ProgressRing value={pct} size={84} stroke={8} />
        <div>
          <div className="text-sm font-semibold" style={{ color: C.navy }}>
            Cumplimiento de actividades
          </div>
          <div className="text-sm" style={{ color: C.ink }}>
            Tu líder te asignó <b>{mine.length}</b> actividades; llevas{' '}
            <b style={{ color: semaforo(pct) }}>{completadas}</b> completadas.
          </div>
        </div>
      </div>
    </Card>
  );
}

function ColabInicio({ me, tasks, setTab }) {
  const ok = objetivoPct(me);
  const tk = taskPct(tasks, me.id);
  const nextTask = tasksOf(tasks, me.id).find((t) => t.status !== 'Completado');
  return (
    <div className="space-y-6">
      <div
        className="rounded-2xl p-8 text-white relative overflow-hidden"
        style={{ background: GRAD }}
      >
        <Sparkles size={120} className="absolute -right-4 -top-4 opacity-10" />
        <p className="text-xs font-semibold tracking-widest uppercase text-white/70 mb-2">
          Tu impacto comienza aquí
        </p>
        <h1 className="text-3xl font-extrabold mb-2">
          Hola, {me.name.split(' ')[0]} 👋
        </h1>
        <p className="text-white/80 max-w-md mb-5">
          {me.puesto} · {me.area}. Esta es tu cultura de resultados: tus
          actividades, tus objetivos y tu evaluación, todo en un lugar.
        </p>
        <button
          onClick={() => setTab('actividades')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm"
          style={{ background: C.orange }}
        >
          Ver mis actividades <ArrowRight size={16} />
        </button>
      </div>
      <div className="flex gap-3 flex-wrap">
        <TimeBanner>
          ⚠️ {DIAS_SEMANA} días para el cierre semanal de actividades
        </TimeBanner>
        <TimeBanner>
          🎯 {DIAS_SEMESTRE} días para el cierre del semestre (
          {formatEs(SEMESTER_END)})
        </TimeBanner>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4">
          <ProgressRing value={tk} size={64} stroke={7} />
          <div>
            <div className="text-sm font-semibold" style={{ color: C.navy }}>
              Actividades completadas
            </div>
            <div className="text-xs" style={{ color: C.sub }}>
              {
                tasksOf(tasks, me.id).filter((t) => t.status === 'Completado')
                  .length
              }
              /{tasksOf(tasks, me.id).length} tareas
            </div>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <ProgressRing value={ok} size={64} stroke={7} />
          <div>
            <div className="text-sm font-semibold" style={{ color: C.navy }}>
              Objetivo del semestre
            </div>
            <div className="text-xs" style={{ color: C.sub }}>
              {me.objetivoIndividual.keyResults.length} resultados clave
            </div>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
            style={{ background: `${ESTADO_COLOR[me.evaluacion.estado]}1A` }}
          >
            <Award
              size={26}
              style={{ color: ESTADO_COLOR[me.evaluacion.estado] }}
            />
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: C.navy }}>
              Evaluación semestral
            </div>
            <div className="text-xs" style={{ color: C.sub }}>
              {ESTADO_LABEL[me.evaluacion.estado]}
            </div>
          </div>
        </Card>
      </div>
      {nextTask && (
        <Card>
          <SectionTitle icon={Star} sub="Tu siguiente actividad pendiente.">
            Próximo paso
          </SectionTitle>
          <div
            className="rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap"
            style={{ background: C.cream }}
          >
            <div>
              <div
                className="text-xs font-bold uppercase tracking-wide"
                style={{ color: C.orange }}
              >
                {nextTask.status}
              </div>
              <div className="font-semibold" style={{ color: C.navy }}>
                {nextTask.title}
              </div>
            </div>
            <button
              onClick={() => setTab('actividades')}
              className="px-4 py-2 rounded-full text-sm font-bold text-white shrink-0"
              style={{ background: C.navy }}
            >
              Ir al tablero
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}

function ColabObjetivos({ me, setProgress }) {
  const pct = objetivoPct(me);
  return (
    <div className="space-y-6">
      <Card>
        <SectionTitle
          icon={Target}
          sub="Se definen en conjunto con tu líder directo al inicio del semestre."
        >
          Objetivos semestrales
        </SectionTitle>
        <TimeBanner>
          🎯 Quedan {DIAS_SEMESTRE} días para el cierre de este semestre (corte:{' '}
          {formatEs(SEMESTER_END)}).
        </TimeBanner>
        <div className="flex flex-col gap-2">
          <div
            className="rounded-xl p-3 text-sm"
            style={{ background: C.navy, color: 'white' }}
          >
            <span className="font-bold">Institucional · </span>
            {OBJETIVO_INSTITUCIONAL}
          </div>
          <div className="flex justify-center">
            <ChevronRight
              className="rotate-90"
              size={16}
              style={{ color: C.sub }}
            />
          </div>
          <div
            className="rounded-xl p-3 text-sm"
            style={{ background: C.navyLight, color: 'white' }}
          >
            <span className="font-bold">{me.area} · </span>
            {OBJETIVO_DEPTO[me.area]}
          </div>
          <div className="flex justify-center">
            <ChevronRight
              className="rotate-90"
              size={16}
              style={{ color: C.sub }}
            />
          </div>
          <div
            className="rounded-xl p-3 text-sm border-2"
            style={{ borderColor: C.orange, color: C.navy }}
          >
            <span className="font-bold" style={{ color: C.orange }}>
              Tu objetivo individual ·{' '}
            </span>
            {me.objetivoIndividual.title}
          </div>
        </div>
      </Card>
      <Card>
        <SectionTitle icon={BarChart3}>Tu cumplimiento</SectionTitle>
        <div
          className="text-4xl font-extrabold mb-1"
          style={{ color: semaforo(pct) }}
        >
          {pct}%
        </div>
        <p className="text-xs mb-5" style={{ color: C.sub }}>
          Se calcula con el avance que confirma tu líder directo. Mientras no
          confirme un resultado clave, se usa tu propio avance reportado.
        </p>
        <div className="space-y-6">
          {me.objetivoIndividual.keyResults.map((kr) => (
            <div key={kr.id}>
              <div
                className="text-sm font-medium mb-2"
                style={{ color: C.ink }}
              >
                {kr.label}
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold" style={{ color: C.orange }}>
                    Tu avance reportado
                  </span>
                  <span className="font-bold" style={{ color: C.orange }}>
                    {kr.progress}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={kr.progress}
                  onChange={(e) =>
                    setProgress(me.id, kr.id, Number(e.target.value))
                  }
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold" style={{ color: C.navy }}>
                    Confirmado por tu líder directo
                  </span>
                  <span className="font-bold" style={{ color: C.navy }}>
                    {kr.progressLider != null
                      ? `${kr.progressLider}%`
                      : 'Pendiente'}
                  </span>
                </div>
                <MiniBar value={kr.progressLider ?? 0} color={C.navy} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ColabEvaluacion({ me, setAutoeval, submitAutoeval }) {
  const ok = objetivoPct(me);
  const avg = evalAvg(me.evaluacion);
  const locked = me.evaluacion.estado !== 'pendiente';
  const idx = finalTierIdx(me);
  const tier = idx >= 0 ? TIERS[idx] : null;
  const hasManagerEval = Object.keys(me.evaluacion.managerEval).length > 0;
  return (
    <div className="space-y-6">
      <TimeBanner>
        🎯 Tu evaluación cierra junto con el semestre: quedan {DIAS_SEMESTRE}{' '}
        días (corte: {formatEs(SEMESTER_END)}).
      </TimeBanner>
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="text-center">
          <div className="text-3xl font-extrabold" style={{ color: C.orange }}>
            {ok}%
          </div>
          <div className="text-xs mt-1" style={{ color: C.sub }}>
            Meta del semestre
          </div>
        </Card>
        <Card className="text-center">
          <div
            className="text-3xl font-extrabold"
            style={{ color: tier ? tier.color : C.sub }}
          >
            {tier ? tier.name : 'Sin iniciar'}
          </div>
          <div className="text-xs mt-1" style={{ color: C.sub }}>
            Clasificación actual
          </div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-extrabold" style={{ color: C.navy }}>
            {avg ? avg.toFixed(1) : '—'}/5
          </div>
          <div className="text-xs mt-1" style={{ color: C.sub }}>
            Calificación promedio
          </div>
        </Card>
      </div>
      <Card>
        <SectionTitle
          icon={Award}
          sub="Califica tu desempeño este semestre del 1 al 5."
        >
          Tu autoevaluación
        </SectionTitle>
        <Badge color={ESTADO_COLOR[me.evaluacion.estado]}>
          {ESTADO_LABEL[me.evaluacion.estado]}
        </Badge>
        <div className="space-y-5 mt-5">
          {CRITERIA.map((cr) => (
            <div key={cr.id}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-medium" style={{ color: C.ink }}>
                  {cr.label}
                </span>
                <span className="text-sm font-bold" style={{ color: C.orange }}>
                  {me.evaluacion.autoeval[cr.id] || 0}/5
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={me.evaluacion.autoeval[cr.id] || 0}
                disabled={locked}
                onChange={(e) =>
                  setAutoeval(me.id, cr.id, Number(e.target.value))
                }
                className="w-full disabled:opacity-50"
              />
            </div>
          ))}
        </div>
        {!locked ? (
          <button
            onClick={() => submitAutoeval(me.id)}
            className="mt-5 px-5 py-2.5 rounded-full text-sm font-bold text-white"
            style={{ background: C.navy }}
          >
            Enviar autoevaluación
          </button>
        ) : (
          <p className="mt-5 text-sm" style={{ color: C.sub }}>
            Ya enviaste tu autoevaluación. Tu líder revisará y calibrará los
            puntajes.
          </p>
        )}
      </Card>
      <Card>
        <SectionTitle
          icon={UserCheck}
          sub="Tu líder evalúa los mismos 4 rubros con base en qué tanto cumpliste tus objetivos semestrales."
        >
          Evaluación de tu líder directo
        </SectionTitle>
        {hasManagerEval ? (
          <div className="space-y-5">
            {CRITERIA.map((cr) => (
              <div key={cr.id}>
                <div className="flex justify-between mb-1.5">
                  <span
                    className="text-sm font-medium"
                    style={{ color: C.ink }}
                  >
                    {cr.label}
                  </span>
                  <span className="text-sm font-bold" style={{ color: C.navy }}>
                    {me.evaluacion.managerEval[cr.id] || 0}/5
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={me.evaluacion.managerEval[cr.id] || 0}
                  disabled
                  className="w-full opacity-70"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm" style={{ color: C.sub }}>
            Tu líder aún no completa esta parte. Lo hará después de revisar tu
            autoevaluación y tu cumplimiento de objetivos (hoy vas en {ok}%).
          </p>
        )}
      </Card>
      <Card>
        <SectionTitle
          icon={Activity}
          sub="Para que sepas exactamente cómo se arma tu resultado final."
        >
          Cómo se calcula tu clasificación
        </SectionTitle>
        <p className="text-sm" style={{ color: C.ink }}>
          Tu clasificación final promedia tu autoevaluación y la evaluación de
          tu líder directo en cada criterio. Mientras más completes tus
          resultados clave de objetivos, más alineadas estarán ambas
          evaluaciones. Llegar a 100% te ubica en Talento en desarrollo:
          Estrella CESUMA es una distinción adicional que tu líder otorga
          cuando, además, propones e implementas una mejora de proceso
          destacada.
        </p>
      </Card>
      <Card>
        <SectionTitle
          icon={Star}
          sub="Así se ve cada nivel y lo que obtienes al alcanzarlo."
        >
          Clasificación y beneficios
        </SectionTitle>
        <TierLadder avg={avg} idx={idx} />
      </Card>
    </div>
  );
}

/* ---------------------------------- admin ---------------------------------- */
function BuzonColab({ onEnviar }) {
  const [tipo, setTipo] = useState("Sugerencia");
  const [texto, setTexto] = useState("");
  const [anonimo, setAnonimo] = useState(true);
  const [nombre, setNombre] = useState("");
  const [enviado, setEnviado] = useState(false);
  const enviar = () => {
    if (!texto.trim()) return;
    onEnviar({ id: Date.now(), tipo, texto, nombre: anonimo ? "Anónimo" : nombre || "Sin nombre", fecha: new Date().toLocaleDateString("es-MX"), leido: false });
    setTexto(""); setNombre(""); setEnviado(true);
    setTimeout(() => setEnviado(false), 3500);
  };
  const TIPO_COLOR = { Sugerencia: C.blue, Queja: C.amber, Denuncia: C.red };
  return (
    <div className="space-y-5">
      <Card>
        <div className="mb-5">
          <h2 className="text-lg font-bold mb-1" style={{ color: C.navy }}>Buzón de comunicación interna</h2>
          <p className="text-sm" style={{ color: C.sub }}>Un espacio seguro para compartir ideas, reportar situaciones y contribuir a la mejora continua de CESUMA.</p>
          <p className="text-xs mt-1" style={{ color: C.sub }}>Gestionado por el Departamento de Estrategia y Mejora Continua (EMC).</p>
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-semibold mb-2" style={{ color: C.navy }}>Tipo de mensaje</div>
            <div className="flex gap-2 flex-wrap">
              {["Sugerencia", "Queja", "Denuncia"].map((t) => (
                <button key={t} onClick={() => setTipo(t)} className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: tipo === t ? TIPO_COLOR[t] : C.cream, color: tipo === t ? "white" : C.ink }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2" style={{ color: C.navy }}>Tu mensaje</div>
            <textarea value={texto} onChange={(e) => setTexto(e.target.value)} rows={5} placeholder="Escribe aquí tu mensaje con el detalle que consideres necesario..." className="w-full rounded-xl px-4 py-3 text-sm border resize-none" style={{ borderColor: "#E7E2D4", fontFamily: "inherit", background: C.cream }} />
          </div>
          <div className="rounded-xl p-4" style={{ background: C.cream }}>
            <label className="flex items-center gap-3 cursor-pointer mb-3">
              <input type="checkbox" checked={anonimo} onChange={(e) => setAnonimo(e.target.checked)} style={{ width: 16, height: 16 }} />
              <div>
                <div className="text-sm font-semibold" style={{ color: C.navy }}>Enviar de forma anónima</div>
                <div className="text-xs" style={{ color: C.sub }}>Tu identidad no será revelada a nadie, ni al EMC ni a directivos.</div>
              </div>
            </label>
            {!anonimo && (
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre completo (opcional)" className="w-full rounded-xl px-4 py-2.5 text-sm border" style={{ borderColor: "#E7E2D4", background: "white" }} />
            )}
          </div>
          {enviado ? (
            <div className="rounded-xl p-4 text-sm font-semibold" style={{ background: `${C.green}15`, color: C.green }}>
              ✓ Mensaje enviado correctamente. El equipo EMC lo revisará pronto.
            </div>
          ) : (
            <button onClick={enviar} disabled={!texto.trim()} className="px-6 py-3 rounded-full text-sm font-bold text-white disabled:opacity-40" style={{ background: C.navy }}>
              Enviar mensaje
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
function BuzonAdmin({ mensajes, marcarLeido }) {
  const TIPO_COLOR = { Sugerencia: C.blue, Queja: C.amber, Denuncia: C.red };
  return (
    <div className="space-y-5">
      <Card>
        <SectionTitle icon={Bell} sub={`${mensajes.length} mensaje${mensajes.length !== 1 ? "s" : ""} recibido${mensajes.length !== 1 ? "s" : ""}.`}>Buzón de comunicación interna</SectionTitle>
        {mensajes.length === 0 ? (
          <p className="text-sm" style={{ color: C.sub }}>No hay mensajes aún.</p>
        ) : (
          <div className="space-y-3">
            {[...mensajes].reverse().map((m) => (
              <div key={m.id} className="rounded-xl p-4" style={{ background: m.leido ? C.cream : `${C.blue}0D`, border: `1px solid ${m.leido ? "#E7E2D4" : C.blue}` }}>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Badge color={TIPO_COLOR[m.tipo]}>{m.tipo}</Badge>
                    <span className="text-xs font-semibold" style={{ color: C.navy }}>{m.nombre}</span>
                    <span className="text-xs" style={{ color: C.sub }}>· {m.fecha}</span>
                  </div>
                  {!m.leido && <button onClick={() => marcarLeido(m.id)} className="text-xs font-bold" style={{ color: C.blue }}>Marcar como leído</button>}
                </div>
                <p className="text-sm" style={{ color: C.ink }}>{m.texto}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
function AdminResumen({ collabs, tasks, setView }) {
  const [scopeMode, setScopeMode] = useState('todo');
  const allAreas = [...new Set(collabs.map((c) => c.area))];
  const [deptoSel, setDeptoSel] = useState(allAreas[0]);

  const scoped =
    scopeMode === 'todo'
      ? collabs
      : scopeMode === 'mio'
      ? collabs.filter((c) => c.area === 'Marketing y Comunicación')
      : collabs.filter((c) => c.area === deptoSel);
  const scopedIds = scoped.map((c) => c.id);
  const scopedTasks = tasks.filter((t) => scopedIds.includes(t.responsableId));
  const scopeLabel =
    scopeMode === 'todo'
      ? 'Todo CESUMA'
      : scopeMode === 'mio'
      ? 'Marketing y Comunicación (mi equipo)'
      : deptoSel;

  const semanalGeneral = scoped.length
    ? Math.round(
        scoped.reduce((a, c) => a + cumplimientoSemanal(tasks, c.id), 0) /
          scoped.length
      )
    : 0;
  const deptRows = allAreas
    .map((a) => {
      const inArea = collabs.filter((c) => c.area === a);
      const semanal = inArea.length
        ? Math.round(
            inArea.reduce((s, c) => s + cumplimientoSemanal(tasks, c.id), 0) /
              inArea.length
          )
        : 0;
      const objetivos = inArea.length
        ? Math.round(
            inArea.reduce((s, c) => s + objetivoPct(c), 0) / inArea.length
          )
        : 0;
      return {
        area: a,
        semanal,
        objetivos,
        cumplio: semanal >= 70,
        n: inArea.length,
      };
    })
    .sort((a, b) => a.semanal - b.semanal);
  const foco = deptRows[0];

  const bloqueadas = scopedTasks
    .filter((t) => t.status === 'Bloqueado')
    .map((t) => ({
      ...t,
      resp: collabs.find((c) => c.id === t.responsableId),
    }));

  const tierCounts = TIERS.map(() => 0);
  let sinIniciar = 0;
  scoped.forEach((c) => {
    const idx = finalTierIdx(c);
    if (idx === -1) sinIniciar++;
    else tierCounts[idx]++;
  });
  const pieTierData = [
    ...TIERS.map((t, i) => ({
      name: t.name,
      value: tierCounts[i],
      color: t.color,
    })),
    { name: 'Sin iniciar', value: sinIniciar, color: C.gray },
  ].filter((d) => d.value > 0);

  const statusCounts = STATUSES.map((s) => ({
    name: s,
    value: scopedTasks.filter((t) => t.status === s).length,
  }));
  const nuevoIngreso = collabs.find((c) => c.nuevoIngreso);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setScopeMode('todo')}
          className="px-3 py-1.5 rounded-full text-xs font-semibold"
          style={
            scopeMode === 'todo'
              ? { background: C.navy, color: 'white' }
              : { background: C.cream, color: C.ink }
          }
        >
          Todo CESUMA
        </button>
        <button
          onClick={() => setScopeMode('depto')}
          className="px-3 py-1.5 rounded-full text-xs font-semibold"
          style={
            scopeMode === 'depto'
              ? { background: C.navy, color: 'white' }
              : { background: C.cream, color: C.ink }
          }
        >
          Por Departamento
        </button>
        {scopeMode === 'depto' && (
          <select
            value={deptoSel}
            onChange={(e) => setDeptoSel(e.target.value)}
            className="rounded-full px-3 py-1.5 text-xs border"
            style={{ borderColor: '#E7E2D4' }}
          >
            {allAreas.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        )}
        <button
          onClick={() => setScopeMode('mio')}
          className="px-3 py-1.5 rounded-full text-xs font-semibold"
          style={
            scopeMode === 'mio'
              ? { background: C.navy, color: 'white' }
              : { background: C.cream, color: C.ink }
          }
        >
          Mi equipo
        </button>
      </div>

      {/* Actividades semanales — primero, como pide el ritual de los lunes */}
      <Card>
        <SectionTitle
          icon={Activity}
          sub={`Actividades semanales · ${scopeLabel}. Revisa esto cada lunes para saber a quién pedir status.`}
        >
          Cumplimiento de actividades semanales
        </SectionTitle>
        <TimeBanner>
          Corte semanal: {formatEs(WEEK_END)} · quedan {DIAS_SEMANA} días.
        </TimeBanner>
        <div className="grid sm:grid-cols-3 gap-4 items-center">
          <div className="flex justify-center">
            <GaugeRing
              value={semanalGeneral}
              label={`Actividades semanales — ${scopeLabel}`}
            />
          </div>
          <div className="sm:col-span-2 space-y-3">
            {deptRows.map((d) => (
              <div key={d.area} className="flex items-center gap-3 flex-wrap">
                <div className="w-40 shrink-0">
                  <div
                    className="text-xs font-semibold"
                    style={{ color: C.navy }}
                  >
                    {d.area}
                  </div>
                  <div className="text-[11px]" style={{ color: C.sub }}>
                    {d.n} colaborador{d.n !== 1 ? 'es' : ''}
                  </div>
                </div>
                <div className="flex-1 min-w-[80px]">
                  <MiniBar
                    value={d.semanal}
                    color={d.cumplio ? C.green : C.red}
                  />
                </div>
                <div
                  className="w-12 text-right text-sm font-bold"
                  style={{ color: d.cumplio ? C.green : C.red }}
                >
                  {d.semanal}%
                </div>
                <Badge color={d.cumplio ? C.green : C.red}>
                  {d.cumplio ? '✅ Cumplió' : '❌ No cumplió'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle
          icon={Flag}
          sub={`Actividades bloqueadas en este momento · ${scopeLabel}.`}
        >
          Cuellos de botella
        </SectionTitle>
        {bloqueadas.length === 0 ? (
          <p className="text-sm" style={{ color: C.green }}>
            Sin cuellos de botella activos por ahora 🎉
          </p>
        ) : (
          <div className="space-y-2">
            {bloqueadas.map((t) => (
              <div
                key={t.id}
                className="rounded-lg p-3 flex items-center justify-between flex-wrap gap-2"
                style={{ background: `${C.red}0D` }}
              >
                <div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: C.navy }}
                  >
                    {t.title}
                  </div>
                  <div className="text-xs" style={{ color: C.sub }}>
                    {t.resp?.name} · {t.resp?.puesto}, {t.resp?.area}
                  </div>
                </div>
                <span className="text-xs font-bold" style={{ color: C.red }}>
                  Vence {t.fecha}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="grid sm:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="text-2xl font-extrabold" style={{ color: C.navy }}>
            {scoped.length}
          </div>
          <div className="text-xs" style={{ color: C.sub }}>
            Colaboradores en vista
          </div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-extrabold" style={{ color: C.orange }}>
            {scoped.length
              ? Math.round(
                  scoped.reduce((a, c) => a + taskPct(tasks, c.id), 0) /
                    scoped.length
                )
              : 0}
            %
          </div>
          <div className="text-xs" style={{ color: C.sub }}>
            Actividades totales completadas (prom.)
          </div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-extrabold" style={{ color: C.amber }}>
            {scoped.filter((c) => objetivoPct(c) < 40).length}
          </div>
          <div className="text-xs" style={{ color: C.sub }}>
            Objetivos en riesgo
          </div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-extrabold" style={{ color: C.navy }}>
            {scoped.filter((c) => c.evaluacion.estado !== 'cerrada').length}
          </div>
          <div className="text-xs" style={{ color: C.sub }}>
            Evaluaciones por cerrar
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle
          icon={Award}
          sub={`Clasificación de desempeño semestral · ${scopeLabel}, según evaluación (autoeval + líder).`}
        >
          Objetivos y desempeño (semestral)
        </SectionTitle>
        <TimeBanner>
          🎯 Quedan {DIAS_SEMESTRE} días para el cierre del semestre (
          {formatEs(SEMESTER_END)}).
        </TimeBanner>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieTierData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={75}
                paddingAngle={2}
              >
                {pieTierData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {foco && (
        <Card>
          <SectionTitle
            icon={AlertTriangle}
            sub="El departamento que necesita atención inmediata esta semana."
          >
            Zona de presión
          </SectionTitle>
          <div className="rounded-xl p-4" style={{ background: `${C.red}0D` }}>
            <div className="text-sm font-bold mb-1" style={{ color: C.red }}>
              {foco.area}
            </div>
            <div className="text-xs mb-2" style={{ color: C.sub }}>
              Cumplimiento semanal de actividades: {foco.semanal}% (meta: 70%) ·
              corte {formatEs(WEEK_END)}
            </div>
            <MiniBar value={foco.semanal} color={C.red} />
          </div>
        </Card>
      )}

      <Card>
        <SectionTitle
          icon={ListChecks}
          sub={`Actividades de ${scopeLabel}, por estatus.`}
        >
          Estatus de actividades
        </SectionTitle>
        <div style={{ height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusCounts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={62}
                paddingAngle={2}
              >
                {statusCounts.map((d, i) => (
                  <Cell key={i} fill={STATUS_COLOR[d.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {nuevoIngreso && (
        <Card>
          <SectionTitle
            icon={Timer}
            sub="Cuenta regresiva ilustrativa para nuevo talento en su primera semana."
          >
            Reloj de victoria temprana
          </SectionTitle>
          <div
            className="rounded-xl p-4 flex items-center justify-between flex-wrap gap-2"
            style={{ background: `${C.amber}1A` }}
          >
            <div>
              <div className="text-sm font-bold" style={{ color: C.navy }}>
                {nuevoIngreso.name}
              </div>
              <div className="text-xs" style={{ color: C.sub }}>
                {nuevoIngreso.puesto} · {nuevoIngreso.area} · talento nuevo
              </div>
            </div>
            <div className="text-2xl font-extrabold" style={{ color: C.amber }}>
              42h : 15m
            </div>
          </div>
        </Card>
      )}

      <Card>
        <SectionTitle
          icon={Users}
          sub={`Cada colaborador de ${scopeLabel}, con su departamento y puesto. Da clic en un nombre para ver su detalle.`}
        >
          Matriz de productividad
        </SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                className="text-left border-b"
                style={{ borderColor: '#E7E2D4' }}
              >
                <th
                  className="py-2 pr-4 font-semibold"
                  style={{ color: C.sub }}
                >
                  Colaborador
                </th>
                <th
                  className="py-2 pr-4 font-semibold"
                  style={{ color: C.sub }}
                >
                  Cumplimiento semanal
                </th>
                <th
                  className="py-2 pr-4 font-semibold"
                  style={{ color: C.sub }}
                >
                  Actividades totales
                </th>
                <th
                  className="py-2 pr-4 font-semibold"
                  style={{ color: C.sub }}
                >
                  Objetivo semestral
                </th>
                <th
                  className="py-2 pr-4 font-semibold"
                  style={{ color: C.sub }}
                >
                  Evaluación
                </th>
              </tr>
            </thead>
            <tbody>
              {scoped.map((c) => (
                <tr
                  key={c.id}
                  className="border-b last:border-0"
                  style={{ borderColor: '#F1EDE0' }}
                >
                  <td className="py-3 pr-4 flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-white shrink-0"
                      style={{ background: GRAD }}
                    >
                      {c.name[0]}
                    </div>
                    <div>
                      <button
                        onClick={() => setView(c.id)}
                        className="font-semibold hover:underline"
                        style={{ color: C.navy }}
                      >
                        {c.name}
                      </button>
                      <div className="text-xs" style={{ color: C.sub }}>
                        {c.puesto} · {c.area}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 w-32">
                    <MiniBar
                      value={cumplimientoSemanal(tasks, c.id)}
                      color={C.blue}
                    />
                  </td>
                  <td className="py-3 pr-4 w-32">
                    <MiniBar value={taskPct(tasks, c.id)} color={C.green} />
                  </td>
                  <td className="py-3 pr-4 w-32">
                    <MiniBar value={objetivoPct(c)} />
                  </td>
                  <td className="py-3 pr-4">
                    <Badge color={ESTADO_COLOR[c.evaluacion.estado]}>
                      {ESTADO_LABEL[c.evaluacion.estado]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function AdminDetalle({
  c,
  tasks,
  collabs,
  back,
  setManagerEval,
  cerrarEvaluacion,
  assignMentor,
  markRevision,
  setProgressLider,
  awardEstrella,
}) {
  const avg = evalAvg(c.evaluacion);
  const idx = finalTierIdx(c);
  const tier = idx >= 0 ? TIERS[idx] : null;
  const [mentorSel, setMentorSel] = useState('');
  const [mejoraTexto, setMejoraTexto] = useState('');
  const perfectScore = avg === 5;
  const posiblesMentores = collabs.filter((x) => x.id !== c.id);
  return (
    <div className="space-y-6">
      <button
        onClick={back}
        className="text-sm font-semibold flex items-center gap-1"
        style={{ color: C.navy }}
      >
        ← Volver al equipo
      </button>
      <Card className="flex items-center gap-4 flex-wrap">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-extrabold text-white shrink-0"
          style={{ background: GRAD }}
        >
          {c.name[0]}
        </div>
        <div>
          <div className="font-bold text-lg" style={{ color: C.navy }}>
            {c.name}
          </div>
          <div className="text-sm" style={{ color: C.sub }}>
            {c.puesto} · {c.area}
          </div>
        </div>
      </Card>
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4">
          <ProgressRing value={taskPct(tasks, c.id)} size={64} stroke={7} />
          <div className="text-sm font-semibold" style={{ color: C.navy }}>
            Actividades
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <ProgressRing value={objetivoPct(c)} size={64} stroke={7} />
          <div className="text-sm font-semibold" style={{ color: C.navy }}>
            Objetivo semestral
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
            style={{ background: `${tier ? tier.color : C.sub}1A` }}
          >
            <Award size={26} style={{ color: tier ? tier.color : C.sub }} />
          </div>
          <div className="text-sm font-semibold" style={{ color: C.navy }}>
            {tier ? tier.name : 'Sin iniciar'}
          </div>
        </Card>
      </div>
      <ComplianceStrip
        tasks={tasks}
        collabId={c.id}
        objetivoPctValue={objetivoPct(c)}
      />
      <TaskBoard
        tasks={tasks}
        collabs={[c]}
        scopeId={c.id}
        canAssignOthers={false}
        onChangeStatus={() => {}}
        onAddTask={() => {}}
      />
      <Card>
        <SectionTitle
          icon={Target}
          sub={`Resultados clave de ${c.name} (${c.puesto}, ${c.area}). Confirma su avance real moviendo la barra azul.`}
        >
          Resultados clave
        </SectionTitle>
        <div className="space-y-6">
          {c.objetivoIndividual.keyResults.map((kr) => (
            <div key={kr.id}>
              <div
                className="text-sm font-medium mb-2"
                style={{ color: C.ink }}
              >
                {kr.label}
              </div>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: C.orange }}>
                  {c.name.split(' ')[0]} reporta
                </span>
                <span className="font-bold" style={{ color: C.orange }}>
                  {kr.progress}%
                </span>
              </div>
              <MiniBar value={kr.progress} color={C.orange} />
              <div className="flex justify-between text-xs mb-1 mt-2">
                <span className="font-semibold" style={{ color: C.navy }}>
                  Tu confirmación como líder
                </span>
                <span className="font-bold" style={{ color: C.navy }}>
                  {kr.progressLider != null
                    ? `${kr.progressLider}%`
                    : 'Sin confirmar'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={kr.progressLider ?? 0}
                onChange={(e) =>
                  setProgressLider(c.id, kr.id, Number(e.target.value))
                }
                className="w-full"
              />
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <SectionTitle
          icon={Award}
          sub="Compara la autoevaluación del colaborador y asigna tu calificación como líder."
        >
          Calibración de evaluación
        </SectionTitle>
        <div className="space-y-5">
          {CRITERIA.map((cr) => (
            <div key={cr.id}>
              <div className="flex justify-between mb-1.5 text-sm">
                <span style={{ color: C.ink }}>{cr.label}</span>
                <span style={{ color: C.sub }}>
                  Autoeval:{' '}
                  <b style={{ color: C.navy }}>
                    {c.evaluacion.autoeval[cr.id] || '—'}
                  </b>{' '}
                  · Líder:{' '}
                  <b style={{ color: C.orange }}>
                    {c.evaluacion.managerEval[cr.id] || 0}/5
                  </b>
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={c.evaluacion.managerEval[cr.id] || 0}
                disabled={
                  c.evaluacion.estado === 'pendiente' ||
                  c.evaluacion.estado === 'cerrada'
                }
                onChange={(e) =>
                  setManagerEval(c.id, cr.id, Number(e.target.value))
                }
                className="w-full disabled:opacity-50"
              />
            </div>
          ))}
        </div>
        {c.evaluacion.estado === 'pendiente' && (
          <p className="mt-4 text-sm" style={{ color: C.sub }}>
            Esperando que {c.name.split(' ')[0]} envíe su autoevaluación.
          </p>
        )}
        {c.evaluacion.estado === 'calibracion' && (
          <button
            onClick={() => cerrarEvaluacion(c.id)}
            className="mt-5 px-5 py-2.5 rounded-full text-sm font-bold text-white"
            style={{ background: C.green }}
          >
            Cerrar evaluación
          </button>
        )}
        {c.evaluacion.estado === 'cerrada' && (
          <Badge color={C.green}>
            Evaluación cerrada · {tier ? tier.name : '—'}
          </Badge>
        )}
      </Card>
      {tier && tier.name === 'En programa de mejora' && (
        <Card>
          <SectionTitle
            icon={UserCheck}
            sub="Asigna formalmente un mentor para fortalecer sus áreas de oportunidad."
          >
            Programa de mentoría
          </SectionTitle>
          {c.mentorAsignado ? (
            <Badge color={C.green}>
              Mentor asignado:{' '}
              {collabs.find((x) => x.id === c.mentorAsignado)?.name}
            </Badge>
          ) : (
            <div className="flex gap-2 flex-wrap">
              <select
                value={mentorSel}
                onChange={(e) => setMentorSel(e.target.value)}
                className="rounded-lg px-3 py-2 text-sm border"
                style={{ borderColor: '#E7E2D4' }}
              >
                <option value="">Selecciona un mentor</option>
                {posiblesMentores.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — {m.puesto}, {m.area}
                  </option>
                ))}
              </select>
              <button
                onClick={() =>
                  mentorSel && assignMentor(c.id, Number(mentorSel))
                }
                disabled={!mentorSel}
                className="px-4 py-2 rounded-lg text-sm font-bold text-white disabled:opacity-40"
                style={{ background: C.amber }}
              >
                Asignar mentor
              </button>
            </div>
          )}
        </Card>
      )}
      {tier && tier.name === 'No satisfactorio' && (
        <Card>
          <SectionTitle
            icon={ShieldAlert}
            sub="Acción que corresponde a este nivel de clasificación."
          >
            Continuidad de contrato
          </SectionTitle>
          {c.revisionContinuidad ? (
            <Badge color={C.red}>Revisión de continuidad marcada</Badge>
          ) : (
            <button
              onClick={() => markRevision(c.id)}
              className="px-4 py-2 rounded-lg text-sm font-bold text-white"
              style={{ background: C.red }}
            >
              Marcar revisión de continuidad de contrato
            </button>
          )}
        </Card>
      )}
      {perfectScore && (
        <Card>
          <SectionTitle
            icon={Star}
            sub="Llegar a 100% lo ubica en Talento en desarrollo. Estrella CESUMA es una distinción adicional: requiere proponer, probar e implementar una mejora de proceso (o un logro igualmente destacado)."
          >
            Estrella CESUMA
          </SectionTitle>
          {c.estrellaCesuma ? (
            <div>
              <Badge color={C.green}>Estrella CESUMA otorgada</Badge>
              <p className="text-sm mt-2" style={{ color: C.ink }}>
                {c.mejoraDescripcion}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                value={mejoraTexto}
                onChange={(e) => setMejoraTexto(e.target.value)}
                placeholder="Describe la mejora de proceso implementada..."
                className="rounded-lg px-3 py-2 text-sm border"
                style={{ borderColor: '#E7E2D4' }}
              />
              <button
                onClick={() =>
                  mejoraTexto.trim() && awardEstrella(c.id, mejoraTexto.trim())
                }
                disabled={!mejoraTexto.trim()}
                className="self-start px-4 py-2 rounded-lg text-sm font-bold text-white disabled:opacity-40"
                style={{ background: C.green }}
              >
                Otorgar Estrella CESUMA
              </button>
            </div>
          )}
        </Card>
      )}
      <Card>
        <SectionTitle icon={Star} sub="Nivel y beneficios correspondientes.">
          Clasificación y beneficios
        </SectionTitle>
        <TierLadder avg={avg} idx={idx} />
      </Card>
    </div>
  );
}

function AdminObjetivos({ collabs, addKeyResult, setProgressLider }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ collabId: collabs[0]?.id, label: '' });
  const submit = () => {
    if (!form.label.trim()) return;
    addKeyResult(form.collabId, form.label.trim());
    setForm({ ...form, label: '' });
    setOpen(false);
  };
  return (
    <Card>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <SectionTitle
          icon={Target}
          sub={`Objetivo institucional: ${OBJETIVO_INSTITUCIONAL}`}
        >
          Objetivos por colaborador
        </SectionTitle>
        <button
          onClick={() => setOpen(!open)}
          className="px-4 py-2 rounded-full text-sm font-bold text-white inline-flex items-center gap-1 shrink-0"
          style={{ background: C.orange }}
        >
          <Plus size={15} /> Resultado clave
        </button>
      </div>
      <TimeBanner>
        🎯 Quedan {DIAS_SEMESTRE} días para el cierre del semestre (
        {formatEs(SEMESTER_END)}).
      </TimeBanner>
      {open && (
        <div
          className="rounded-xl p-4 mb-5 flex flex-col sm:flex-row gap-3"
          style={{ background: C.cream }}
        >
          <select
            value={form.collabId}
            onChange={(e) =>
              setForm({ ...form, collabId: Number(e.target.value) })
            }
            className="rounded-lg px-3 py-2 text-sm border"
            style={{ borderColor: '#E7E2D4' }}
          >
            {collabs.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} — {c.puesto}
              </option>
            ))}
          </select>
          <input
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            placeholder="Nuevo resultado clave..."
            className="flex-1 rounded-lg px-3 py-2 text-sm border"
            style={{ borderColor: '#E7E2D4' }}
          />
          <button
            onClick={submit}
            className="px-4 py-2 rounded-lg text-sm font-bold text-white"
            style={{ background: C.navy }}
          >
            Agregar
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded-lg text-sm"
            style={{ color: C.sub }}
          >
            <X size={16} />
          </button>
        </div>
      )}
      <div className="space-y-6">
        {collabs.map((c) => (
          <div
            key={c.id}
            className="rounded-xl p-4 border"
            style={{ borderColor: '#E7E2D4' }}
          >
            <div className="flex justify-between items-center mb-3 flex-wrap gap-1">
              <div>
                <span className="font-bold" style={{ color: C.navy }}>
                  {c.name}
                </span>
                <span className="text-xs" style={{ color: C.sub }}>
                  {' '}
                  · {c.puesto}, {c.area}
                </span>
                <div className="text-sm" style={{ color: C.sub }}>
                  {c.objetivoIndividual.title}
                </div>
              </div>
              <Badge color={C.orange}>{objetivoPct(c)}%</Badge>
            </div>
            <div className="space-y-3">
              {c.objetivoIndividual.keyResults.map((kr) => (
                <div key={kr.id}>
                  <div className="text-xs mb-1" style={{ color: C.ink }}>
                    {kr.label}
                  </div>
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="text-[11px] w-28 shrink-0"
                      style={{ color: C.orange }}
                    >
                      Reporta {c.name.split(' ')[0]}
                    </span>
                    <div className="flex-1">
                      <MiniBar value={kr.progress} color={C.orange} />
                    </div>
                    <span
                      className="text-xs font-bold w-10 text-right"
                      style={{ color: C.orange }}
                    >
                      {kr.progress}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[11px] w-28 shrink-0"
                      style={{ color: C.navy }}
                    >
                      Tu confirmación
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={kr.progressLider ?? 0}
                      onChange={(e) =>
                        setProgressLider(c.id, kr.id, Number(e.target.value))
                      }
                      className="flex-1"
                    />
                    <span
                      className="text-xs font-bold w-10 text-right"
                      style={{ color: C.navy }}
                    >
                      {kr.progressLider != null ? `${kr.progressLider}%` : '—'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AdminEvaluaciones({ collabs, setView }) {
  return (
    <Card>
      <SectionTitle
        icon={Award}
        sub="Estado del proceso de evaluación semestral por colaborador."
      >
        Evaluaciones del semestre
      </SectionTitle>
      <TimeBanner>
        🎯 Quedan {DIAS_SEMESTRE} días para el cierre del semestre (
        {formatEs(SEMESTER_END)}).
      </TimeBanner>
      <div className="space-y-3">
        {collabs.map((c) => {
          const avg = evalAvg(c.evaluacion);
          const idx = finalTierIdx(c);
          const tier = idx >= 0 ? TIERS[idx] : null;
          return (
            <button
              key={c.id}
              onClick={() => setView(c.id)}
              className="w-full flex items-center justify-between rounded-xl p-4 text-left transition hover:bg-black/[0.02]"
              style={{ background: C.cream }}
            >
              <div>
                <div className="font-semibold" style={{ color: C.navy }}>
                  {c.name}
                </div>
                <div className="text-xs" style={{ color: C.sub }}>
                  {c.puesto} · {c.area}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {tier && <Badge color={tier.color}>{tier.name}</Badge>}
                <Badge color={ESTADO_COLOR[c.evaluacion.estado]}>
                  {ESTADO_LABEL[c.evaluacion.estado]}
                </Badge>
                <ChevronRight size={16} style={{ color: C.sub }} />
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

/* ---------------------------------- app ---------------------------------- */
const COLAB_TABS = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'actividades', label: 'Actividades', icon: ListChecks },
  { id: 'objetivos', label: 'Objetivos', icon: Target },
  { id: 'evaluacion', label: 'Evaluación', icon: Award },
  { id: 'intranet', label: 'Intranet', icon: MessageSquare },
  { id: 'recursos', label: 'Recursos', icon: FolderOpen },
  { id: "buzon", label: "Buzón", icon: Bell },
];
const ADMIN_TABS = [
  { id: 'resumen', label: 'Resumen de equipo', icon: BarChart3 },
  { id: 'actividades', label: 'Actividades', icon: ListChecks },
  { id: 'objetivos', label: 'Objetivos', icon: Target },
  { id: 'evaluaciones', label: 'Evaluaciones', icon: Award },
  { id: 'intranet', label: 'Intranet', icon: MessageSquare },
  { id: 'recursos', label: 'Recursos', icon: FolderOpen },
  { id: "buzon", label: "Buzón", icon: Bell },
];

function Header({ role, setRole, tab, setTab, tabs, viewerName }) {
  return (
    <header style={{ background: C.navy }} className="text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-5 pb-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-base"
            style={{ background: GRAD }}
          >
            M
          </div>
          <div>
            <div className="font-extrabold tracking-tight leading-none">
              UNIVERSIDAD <span style={{ color: C.orangeLight }}>CESUMA</span>
            </div>
            <div className="text-xs text-white/60 leading-tight">
              Cultura de Resultados · Plataforma diaria
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/60 hidden sm:inline">
            Viendo como {viewerName}
          </span>
          <div
            className="flex rounded-full p-1"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <button
              onClick={() => setRole('colaborador')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition"
              style={
                role === 'colaborador'
                  ? { background: C.orange, color: 'white' }
                  : { color: 'rgba(255,255,255,0.75)' }
              }
            >
              Colaborador
            </button>
            <button
              onClick={() => setRole('admin')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition"
              style={
                role === 'admin'
                  ? { background: C.orange, color: 'white' }
                  : { color: 'rgba(255,255,255,0.75)' }
              }
            >
              Admin · RRHH
            </button>
          </div>
        </div>
      </div>
      <nav className="max-w-6xl mx-auto px-4 md:px-8 flex gap-1 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition flex items-center gap-2"
            style={
              tab === t.id
                ? { borderColor: C.orange, color: 'white' }
                : {
                    borderColor: 'transparent',
                    color: 'rgba(255,255,255,0.55)',
                  }
            }
          >
            <t.icon size={15} />
            {t.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default function App() {
  const [collabs, setCollabs] = useState(INITIAL_COLLABORATORS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [buzonMensajes, setBuzonMensajes] = useState([]);
const onBuzonEnviar = (msg) => setBuzonMensajes((prev) => [...prev, msg]);
const marcarLeido = (id) => setBuzonMensajes((prev) => prev.map((m) => m.id === id ? { ...m, leido: true } : m));
  const [role, setRole] = useState('colaborador');
  const [colabTab, setColabTab] = useState('inicio');
  const [adminTab, setAdminTab] = useState('resumen');
  const [adminView, setAdminView] = useState(null);

  const meId = 1;
  const me = collabs.find((c) => c.id === meId);
  const update = (id, fn) =>
    setCollabs((prev) => prev.map((c) => (c.id === id ? fn(c) : c)));

  const setProgress = (id, krId, val) =>
    update(id, (c) => ({
      ...c,
      objetivoIndividual: {
        ...c.objetivoIndividual,
        keyResults: c.objetivoIndividual.keyResults.map((k) =>
          k.id === krId ? { ...k, progress: val } : k
        ),
      },
    }));
  const setProgressLider = (id, krId, val) =>
    update(id, (c) => ({
      ...c,
      objetivoIndividual: {
        ...c.objetivoIndividual,
        keyResults: c.objetivoIndividual.keyResults.map((k) =>
          k.id === krId ? { ...k, progressLider: val } : k
        ),
      },
    }));
  const setAutoeval = (id, crId, val) =>
    update(id, (c) => ({
      ...c,
      evaluacion: {
        ...c.evaluacion,
        autoeval: { ...c.evaluacion.autoeval, [crId]: val },
      },
    }));
  const submitAutoeval = (id) =>
    update(id, (c) => ({
      ...c,
      evaluacion: { ...c.evaluacion, estado: 'calibracion' },
    }));
  const setManagerEval = (id, crId, val) =>
    update(id, (c) => ({
      ...c,
      evaluacion: {
        ...c.evaluacion,
        managerEval: { ...c.evaluacion.managerEval, [crId]: val },
      },
    }));
  const cerrarEvaluacion = (id) =>
    update(id, (c) => ({
      ...c,
      evaluacion: { ...c.evaluacion, estado: 'cerrada' },
    }));
  const addKeyResult = (collabId, label) =>
    update(collabId, (c) => ({
      ...c,
      objetivoIndividual: {
        ...c.objetivoIndividual,
        keyResults: [
          ...c.objetivoIndividual.keyResults,
          { id: Date.now(), label, progress: 0, progressLider: null },
        ],
      },
    }));
  const assignMentor = (collabId, mentorId) =>
    update(collabId, (c) => ({ ...c, mentorAsignado: mentorId }));
  const markRevision = (collabId) =>
    update(collabId, (c) => ({ ...c, revisionContinuidad: true }));
  const awardEstrella = (collabId, mejora) =>
    update(collabId, (c) => ({
      ...c,
      estrellaCesuma: true,
      mejoraDescripcion: mejora,
    }));

  const onChangeStatus = (taskId, status) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
  const onAddTask = (task) => setTasks((prev) => [...prev, task]);
  const onPostMessage = (msg) => setMessages((prev) => [...prev, msg]);
  const onReact = (id, emoji) =>
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              reactions: {
                ...m.reactions,
                [emoji]: (m.reactions?.[emoji] || 0) + 1,
              },
            }
          : m
      )
    );

  return (
    <div
      className="min-h-screen"
      style={{
        background: C.cream,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <Header
        role={role}
        setRole={(r) => {
          setRole(r);
          setAdminView(null);
        }}
        tab={role === 'colaborador' ? colabTab : adminTab}
        setTab={
          role === 'colaborador'
            ? setColabTab
            : (t) => {
                setAdminTab(t);
                setAdminView(null);
              }
        }
        tabs={role === 'colaborador' ? COLAB_TABS : ADMIN_TABS}
        viewerName={role === 'colaborador' ? me.name : ADMIN_NAME}
      />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {role === 'colaborador' && colabTab === 'inicio' && (
          <ColabInicio me={me} tasks={tasks} setTab={setColabTab} />
        )}
        {role === 'colaborador' && colabTab === 'actividades' && (
          <div className="space-y-6">
            <MisActividadesResumen tasks={tasks} collabId={meId} />
            <TaskBoard
              tasks={tasks}
              collabs={collabs}
              scopeId={meId}
              canAssignOthers={false}
              onChangeStatus={onChangeStatus}
              onAddTask={onAddTask}
            />
          </div>
        )}
        {role === 'colaborador' && colabTab === 'objetivos' && (
          <ColabObjetivos me={me} setProgress={setProgress} />
        )}
        {role === 'colaborador' && colabTab === 'evaluacion' && (
          <ColabEvaluacion
            me={me}
            setAutoeval={setAutoeval}
            submitAutoeval={submitAutoeval}
          />
        )}
        {role === 'colaborador' && colabTab === 'intranet' && (
          <Intranet
            messages={messages}
            onPost={onPostMessage}
            onReact={onReact}
            viewerName={me.name}
          />
        )}
        
        {role === 'colaborador' && colabTab === 'buzon' && <BuzonColab onEnviar={onBuzonEnviar} />}
        

        {role === 'admin' && adminView == null && adminTab === 'resumen' && (
          <AdminResumen
            collabs={collabs}
            tasks={tasks}
            setView={setAdminView}
          />
        )}
        {role === 'admin' &&
          adminView == null &&
          adminTab === 'actividades' && (
            <div className="space-y-6">
              <RemindersPanel tasks={tasks} collabs={collabs} />
              <TaskBoard
                tasks={tasks}
                collabs={collabs}
                canAssignOthers
                onChangeStatus={onChangeStatus}
                onAddTask={onAddTask}
              />
            </div>
          )}
        {role === 'admin' && adminView == null && adminTab === 'objetivos' && (
          <AdminObjetivos
            collabs={collabs}
            addKeyResult={addKeyResult}
            setProgressLider={setProgressLider}
          />
        )}
        {role === 'admin' &&
          adminView == null &&
          adminTab === 'evaluaciones' && (
            <AdminEvaluaciones collabs={collabs} setView={setAdminView} />
          )}
        {role === 'admin' && adminView == null && adminTab === 'intranet' && (
          <Intranet
            messages={messages}
            onPost={onPostMessage}
            onReact={onReact}
            viewerName={ADMIN_NAME}
          />
        )}
        {role === 'admin' && adminView == null && adminTab === 'recursos' && (
          <Recursos />
        )}
        {role === 'admin' && adminView == null && adminTab === 'buzon' && <BuzonAdmin mensajes={buzonMensajes} marcarLeido={marcarLeido} />}
        {role === 'admin' && adminView != null && (
          <AdminDetalle
            c={collabs.find((c) => c.id === adminView)}
            tasks={tasks}
            collabs={collabs}
            back={() => setAdminView(null)}
            setManagerEval={setManagerEval}
            cerrarEvaluacion={cerrarEvaluacion}
            assignMentor={assignMentor}
            markRevision={markRevision}
            setProgressLider={setProgressLider}
            awardEstrella={awardEstrella}
          />
        )}
      </main>
      <footer className="text-center text-xs py-6" style={{ color: C.sub }}>
        Prototipo · Plataforma diaria CESUMA — propuesto por Estrategia y Mejora
        Continua (EMC)
      </footer>
    </div>
  );
}

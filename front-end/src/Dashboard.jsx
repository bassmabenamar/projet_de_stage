import {
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  Wallet,
  CreditCard,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Dashboard() {
  // Données statiques pour admin
  const me = {
    firstName: "Alex",
    lastName: "Johnson",
    role: "admin"
  };

  // Données statiques du dashboard admin
  const data = {
    totalStudents: 156,
    totalTrainers: 24,
    totalSections: 12,
    totalAssignments: 48,
    totalPaymentsReceived: 185000,
    totalPaymentsDue: 210000,
    paidStudents: 112,
    unpaidStudents: 44,
    paymentsByMonth: [
      { month: "2024-01", amount: 12500 },
      { month: "2024-02", amount: 15800 },
      { month: "2024-03", amount: 14200 },
      { month: "2024-04", amount: 18900 },
      { month: "2024-05", amount: 21000 },
      { month: "2024-06", amount: 23500 },
    ],
    studentsBySection: [
      { sectionName: "2ème Année GL", count: 32 },
      { sectionName: "1ère Année DS", count: 28 },
      { sectionName: "3ème Année Cyber", count: 24 },
      { sectionName: "Master 1 IA", count: 18 },
      { sectionName: "Master 2 DevOps", count: 15 },
    ],
    recentPayments: [
      { id: 1, studentName: "Sarah Martin", amount: 2500, paymentDate: "2024-06-15", method: "Carte bancaire" },
      { id: 2, studentName: "Karim Benali", amount: 2500, paymentDate: "2024-06-14", method: "Virement" },
      { id: 3, studentName: "Leila Ouazzani", amount: 2500, paymentDate: "2024-06-12", method: "Espèces" },
      { id: 4, studentName: "Mohamed Tazi", amount: 2500, paymentDate: "2024-06-10", method: "Carte bancaire" },
    ],
    recentActivities: [
      { id: 1, title: "Examen de fin d'année", startDate: "2024-07-01", category: "Examen", location: "Salle A101" },
      { id: 2, title: "Réunion des formateurs", startDate: "2024-06-25", category: "Réunion", location: "Salle B202" },
      { id: 3, title: "Remise des diplômes", startDate: "2024-07-15", category: "Cérémonie", location: "Amphi A" },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-800">Tableau de bord</h1>
            <p className="text-gray-500">
              Bienvenue, {me.firstName} {me.lastName}
            </p>
          </div>

          {/* Première rangée - Stats générales */}
          <div className="grid gap-4 md:grid-cols-4">
            {/* Carte Étudiants */}
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="flex flex-row items-center justify-between p-6 pb-2">
                <h3 className="text-sm font-medium text-gray-500">Étudiants</h3>
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50">
                  <Users className="h-5 w-5 text-[#2F5D9F]" />
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-semibold text-gray-800">{data.totalStudents}</div>
              </div>
            </div>

            {/* Carte Formateurs */}
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="flex flex-row items-center justify-between p-6 pb-2">
                <h3 className="text-sm font-medium text-gray-500">Formateurs</h3>
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50">
                  <GraduationCap className="h-5 w-5 text-[#2F5D9F]" />
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-semibold text-gray-800">{data.totalTrainers}</div>
              </div>
            </div>

            {/* Carte Classes */}
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="flex flex-row items-center justify-between p-6 pb-2">
                <h3 className="text-sm font-medium text-gray-500">Classes</h3>
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50">
                  <BookOpen className="h-5 w-5 text-[#2F5D9F]" />
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-semibold text-gray-800">{data.totalSections}</div>
              </div>
            </div>

            {/* Carte Devoirs */}
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="flex flex-row items-center justify-between p-6 pb-2">
                <h3 className="text-sm font-medium text-gray-500">Devoirs</h3>
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50">
                  <ClipboardList className="h-5 w-5 text-[#2F5D9F]" />
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-semibold text-gray-800">{data.totalAssignments}</div>
              </div>
            </div>
          </div>

          {/* Deuxième rangée - Stats financières */}
          <div className="grid gap-4 md:grid-cols-4">
            {/* Carte Encaissé */}
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="flex flex-row items-center justify-between p-6 pb-2">
                <h3 className="text-sm font-medium text-gray-500">Encaissé</h3>
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50">
                  <Wallet className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-semibold text-gray-800">185 000 €</div>
                <p className="mt-1 text-xs text-gray-500">88% du total dû</p>
              </div>
            </div>

            {/* Carte Reste à percevoir */}
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="flex flex-row items-center justify-between p-6 pb-2">
                <h3 className="text-sm font-medium text-gray-500">Reste à percevoir</h3>
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-50">
                  <CreditCard className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-semibold text-gray-800">25 000 €</div>
              </div>
            </div>

            {/* Carte Étudiants à jour */}
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="flex flex-row items-center justify-between p-6 pb-2">
                <h3 className="text-sm font-medium text-gray-500">Étudiants à jour</h3>
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-semibold text-gray-800">{data.paidStudents}</div>
              </div>
            </div>

            {/* Carte Étudiants en attente */}
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="flex flex-row items-center justify-between p-6 pb-2">
                <h3 className="text-sm font-medium text-gray-500">Étudiants en attente</h3>
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-rose-50">
                  <AlertCircle className="h-5 w-5 text-rose-600" />
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-semibold text-gray-800">{data.unpaidStudents}</div>
              </div>
            </div>
          </div>

          {/* Graphiques */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Graphique Paiements */}
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="p-6 pb-2">
                <h3 className="text-lg font-semibold text-gray-800">Paiements par mois</h3>
                <p className="text-sm text-gray-500">Encaissements mensuels</p>
              </div>
              <div className="p-6 pt-0">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.paymentsByMonth.map(p => ({ ...p, label: (() => { const [y,m] = p.month.split("-"); return new Date(Number(y), Number(m)-1, 1).toLocaleDateString("fr-FR", { month: "short", year: "2-digit" }); })() }))}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
                      <Tooltip formatter={(v) => `${v.toLocaleString()} €`} />
                      <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Graphique Étudiants par classe */}
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="p-6 pb-2">
                <h3 className="text-lg font-semibold text-gray-800">Étudiants par classe</h3>
                <p className="text-sm text-gray-500">Répartition des effectifs</p>
              </div>
              <div className="p-6 pt-0">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={data.studentsBySection} dataKey="count" nameKey="sectionName"
                        cx="50%" cy="50%" outerRadius={90} label>
                        {data.studentsBySection.map((_, i) => (
                          <Cell key={i} fill={["#6366f1", "#22c55e", "#f59e0b", "#ec4899", "#06b6d4"][i % 5]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Derniers paiements et activités */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Derniers paiements */}
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="p-6 pb-2">
                <h3 className="text-lg font-semibold text-gray-800">Derniers paiements</h3>
              </div>
              <div className="p-6 pt-0 space-y-2">
                {data.recentPayments.map((p) => (
                  <div key={p.id} className="flex items-center justify-between border-b py-2 last:border-0">
                    <div>
                      <p className="font-medium text-gray-800">{p.studentName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(p.paymentDate).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })} · {p.method}
                      </p>
                    </div>
                    <span className="font-semibold text-emerald-600">{p.amount.toLocaleString()} €</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activités à venir */}
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="p-6 pb-2">
                <h3 className="text-lg font-semibold text-gray-800">Activités à venir</h3>
              </div>
              <div className="p-6 pt-0 space-y-2">
                {data.recentActivities.map((a) => (
                  <div key={a.id} className="border-b py-2 last:border-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-800">{a.title}</p>
                      <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">{a.category}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(a.startDate).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })} · {a.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
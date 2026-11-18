
<template>
  <div class="page-evaluations">

    <!-- En-tête -->
    <div class="entete">
      <div>
        <h1>Évaluations</h1>
        <p>Gérez les évaluations et leurs programmations.</p>
      </div>

      <button class="btn-ajouter" @click="creerEvaluation">
        <span>＋</span> Nouvelle évaluation
      </button>
    </div>

    <!-- Statistiques -->
    <div class="statistiques">

      <div class="stat-card">
        <div class="stat-icon bleu">📋</div>
        <div>
          <p>Total des évaluations</p>
          <h2>{{ totalEvaluations }}</h2>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon orange">⏳</div>
        <div>
          <p>En cours</p>
          <h2>{{ evaluationsEnCours }}</h2>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon violet">📅</div>
        <div>
          <p>À venir</p>
          <h2>{{ evaluationsAVenir }}</h2>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon vert">✓</div>
        <div>
          <p>Effectuées</p>
          <h2>{{ evaluationsEffectuees }}</h2>
        </div>
      </div>

    </div>

    <!-- Filtres -->
    <div class="filtre-section">

      <div class="filtre-entete">
        <div>
          <h3>Liste des évaluations</h3>
          <p>Consultez et recherchez les évaluations enregistrées.</p>
        </div>
      </div>

      <div class="filtres">

        <div class="champ">
          <label>Recherche</label>
          <input
            type="text"
            v-model="recherche"
            placeholder="Code, intitulé, UE, EC..."
          />
        </div>

        <div class="champ">
          <label>Type d'évaluation</label>
          <select v-model="filtreType">
            <option value="">Tous les types</option>
            <option value="Contrôle continu">Contrôle continu</option>
            <option value="Examen">Examen</option>
            <option value="Soutenance">Soutenance</option>
          </select>
        </div>

        <div class="champ">
          <label>Session</label>
          <select v-model="filtreSession">
            <option value="">Toutes les sessions</option>
            <option value="Normale">Normale</option>
            <option value="Rattrapage">Rattrapage</option>
          </select>
        </div>

        <div class="champ">
          <label>Statut</label>
          <select v-model="filtreStatut">
            <option value="">Tous les statuts</option>
            <option value="À venir">À venir</option>
            <option value="En cours">En cours</option>
            <option value="Effectuée">Effectuée</option>
          </select>
        </div>

        <button class="btn-reinitialiser" @click="reinitialiserFiltres">
          Réinitialiser
        </button>

      </div>
    </div>

    <!-- Tableau -->
    <div class="tableau-section">

      <div class="tableau-entete">
        <h3>Évaluations enregistrées</h3>
        <span>{{ evaluationsFiltrees.length }} résultat(s)</span>
      </div>

      <div class="tableau-responsive">
        <table>
          <thead>
            <tr>
              <th>N° Évaluation</th>
              <th>Intitulé</th>
              <th>UE</th>
              <th>EC</th>
              <th>Session</th>
              <th>Type</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="evaluation in evaluationsFiltrees"
              :key="evaluation.id"
            >
              <td class="code">{{ evaluation.numevaluation }}</td>

              <td class="intitule">
                {{ evaluation.intitule }}
              </td>

              <td>{{ evaluation.ue }}</td>

              <td>{{ evaluation.ec }}</td>

              <td>
                <span class="session-badge">
                  {{ evaluation.session }}
                </span>
              </td>

              <td>{{ evaluation.type }}</td>

              <td>{{ formaterDate(evaluation.date) }}</td>

              <td>
                <span
                  class="statut"
                  :class="classeStatut(evaluation.statut)"
                >
                  {{ evaluation.statut }}
                </span>
              </td>

              <td>
                <div class="actions">
                  <button
                    class="btn-consulter"
                    title="Consulter"
                    @click="consulterEvaluation(evaluation)"
                  >
                    👁
                  </button>

                  <button
                    class="btn-modifier"
                    title="Modifier"
                    @click="modifierEvaluation(evaluation)"
                  >
                    ✏
                  </button>

                  <button
                    class="btn-supprimer"
                    title="Supprimer"
                    @click="supprimerEvaluation(evaluation)"
                  >
                    🗑
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="evaluationsFiltrees.length === 0">
              <td colspan="9" class="aucun-resultat">
                Aucune évaluation trouvée.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Données de test
const evaluations = ref([
  {
    id: 1,
    numevaluation: 'EVT001',
    intitule: 'Contrôle continu 1',
    ue: 'UE001',
    ec: 'EC001',
    session: 'Normale',
    type: 'Contrôle continu',
    date: '2026-11-15',
    statut: 'En cours'
  },
  {
    id: 2,
    numevaluation: 'EVT002',
    intitule: 'Examen final',
    ue: 'UE001',
    ec: 'EC002',
    session: 'Normale',
    type: 'Examen',
    date: '2026-12-20',
    statut: 'À venir'
  },
  {
    id: 3,
    numevaluation: 'EVT003',
    intitule: 'Contrôle continu 2',
    ue: 'UE002',
    ec: 'EC003',
    session: 'Normale',
    type: 'Contrôle continu',
    date: '2027-05-10',
    statut: 'En cours'
  },
  {
    id: 4,
    numevaluation: 'EVT004',
    intitule: 'Examen de rattrapage',
    ue: 'UE002',
    ec: 'EC004',
    session: 'Rattrapage',
    type: 'Examen',
    date: '2026-08-25',
    statut: 'Effectuée'
  },
  {
    id: 5,
    numevaluation: 'EVT005',
    intitule: 'Soutenance de projet',
    ue: 'UE003',
    ec: 'EC005',
    session: 'Normale',
    type: 'Soutenance',
    date: '2026-11-18',
    statut: 'Effectuée'
  }
])

// Filtres
const recherche = ref('')
const filtreType = ref('')
const filtreSession = ref('')
const filtreStatut = ref('')

// Statistiques
const totalEvaluations = computed(() => evaluations.value.length)

const evaluationsEnCours = computed(() =>
  evaluations.value.filter(e => e.statut === 'En cours').length
)

const evaluationsAVenir = computed(() =>
  evaluations.value.filter(e => e.statut === 'À venir').length
)

const evaluationsEffectuees = computed(() =>
  evaluations.value.filter(e => e.statut === 'Effectuée').length
)

// Recherche et filtrage
const evaluationsFiltrees = computed(() => {
  return evaluations.value.filter(evaluation => {
    const texte = recherche.value.toLowerCase().trim()

    const correspondRecherche =
      evaluation.numevaluation.toLowerCase().includes(texte) ||
      evaluation.intitule.toLowerCase().includes(texte) ||
      evaluation.ue.toLowerCase().includes(texte) ||
      evaluation.ec.toLowerCase().includes(texte)

    const correspondType =
      !filtreType.value ||
      evaluation.type === filtreType.value

    const correspondSession =
      !filtreSession.value ||
      evaluation.session === filtreSession.value

    const correspondStatut =
      !filtreStatut.value ||
      evaluation.statut === filtreStatut.value

    return (
      correspondRecherche &&
      correspondType &&
      correspondSession &&
      correspondStatut
    )
  })
})

// Réinitialiser les filtres
function reinitialiserFiltres() {
  recherche.value = ''
  filtreType.value = ''
  filtreSession.value = ''
  filtreStatut.value = ''
}

// Formater une date au format JJ-MM-AAAA
function formaterDate(date) {
  if (!date) return ''

  const [annee, mois, jour] = date.split('-')
  return `${jour}-${mois}-${annee}`
}

// Classe CSS selon le statut
function classeStatut(statut) {
  switch (statut) {
    case 'En cours':
      return 'statut-encours'

    case 'À venir':
      return 'statut-avenir'

    case 'Effectuée':
      return 'statut-effectuee'

    default:
      return ''
  }
}

// Créer une évaluation
function creerEvaluation() {
  router.push('/dashboard/creerEvaluation')
}

// Consulter une évaluation
function consulterEvaluation(evaluation) {
  alert(
    `Évaluation : ${evaluation.numevaluation}\n` +
    `Intitulé : ${evaluation.intitule}\n` +
    `UE : ${evaluation.ue}\n` +
    `EC : ${evaluation.ec}\n` +
    `Session : ${evaluation.session}\n` +
    `Date : ${formaterDate(evaluation.date)}\n` +
    `Statut : ${evaluation.statut}`
  )
}

// Modifier une évaluation
function modifierEvaluation(evaluation) {
  router.push(`/dashboard/modifierEvaluation/${evaluation.id}`)
}

// Supprimer une évaluation
function supprimerEvaluation(evaluation) {
  const confirmation = confirm(
    `Voulez-vous vraiment supprimer l'évaluation ${evaluation.numevaluation} ?`
  )

  if (!confirmation) return

  evaluations.value = evaluations.value.filter(
    e => e.id !== evaluation.id
  )

  alert('Évaluation supprimée avec succès.')
}
</script>

<style scoped>
.page-evaluations {
  padding: 25px;
  background: #f5f7fb;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  color: #263247;
}

/* En-tête */
.entete {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  gap: 15px;
}

.entete h1 {
  font-size: 26px;
  margin: 0 0 8px;
  color: #172b4d;
}

.entete p {
  margin: 0;
  color: #8491a5;
  font-size: 14px;
}

.btn-ajouter {
  background: #2864dc;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 7px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}

.btn-ajouter:hover {
  background: #174db8;
}

.btn-ajouter span {
  font-size: 18px;
  margin-right: 5px;
}

/* Statistiques */
.statistiques {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 25px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.stat-card p {
  color: #8994a7;
  font-size: 13px;
  margin: 0 0 8px;
}

.stat-card h2 {
  margin: 0;
  font-size: 25px;
  color: #263247;
}

.stat-icon {
  width: 45px;
  height: 45px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
}

.bleu {
  background: #e7efff;
}

.orange {
  background: #fff0df;
}

.violet {
  background: #f0eaff;
}

.vert {
  background: #e3f7ec;
}

/* Filtres */
.filtre-section,
.tableau-section {
  background: white;
  border-radius: 10px;
  padding: 22px;
  margin-bottom: 22px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.filtre-entete h3,
.tableau-entete h3 {
  margin: 0 0 7px;
  font-size: 17px;
  color: #263247;
}

.filtre-entete p {
  margin: 0 0 20px;
  color: #8994a7;
  font-size: 13px;
}

.filtres {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1.2fr 1.2fr auto;
  gap: 12px;
  align-items: end;
}

.champ {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.champ label {
  font-size: 13px;
  font-weight: 600;
  color: #56647a;
}

.champ input,
.champ select {
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  padding: 0 11px;
  border: 1px solid #dce2eb;
  border-radius: 6px;
  outline: none;
  color: #344054;
  background: white;
  font-size: 13px;
}

.champ input:focus,
.champ select:focus {
  border-color: #2864dc;
}

.btn-reinitialiser {
  height: 40px;
  padding: 0 14px;
  border: 1px solid #dce2eb;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  color: #526078;
  white-space: nowrap;
}

.btn-reinitialiser:hover {
  background: #f2f5fa;
}

/* Tableau */
.tableau-entete {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.tableau-entete span {
  color: #8994a7;
  font-size: 13px;
}

.tableau-responsive {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1050px;
}

thead {
  background: #f5f7fb;
}

th {
  text-align: left;
  padding: 14px 12px;
  color: #66748a;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

td {
  padding: 15px 12px;
  border-bottom: 1px solid #edf0f5;
  font-size: 12px;
  color: #536177;
  white-space: nowrap;
}

tbody tr:hover {
  background: #fafbfe;
}

.code {
  color: #2864dc;
  font-weight: 600;
}

.intitule {
  color: #263247;
  font-weight: 600;
}

.session-badge {
  background: #eef3ff;
  color: #3864b5;
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 11px;
}

/* Statuts */
.statut {
  padding: 6px 9px;
  border-radius: 15px;
  font-size: 11px;
  font-weight: 600;
}

.statut-encours {
  background: #fff2dc;
  color: #c17b13;
}

.statut-avenir {
  background: #e9efff;
  color: #3864c8;
}

.statut-effectuee {
  background: #e3f7ec;
  color: #258451;
}

/* Actions */
.actions {
  display: flex;
  gap: 7px;
}

.actions button {
  width: 29px;
  height: 29px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: #f0f3f8;
}

.btn-consulter {
  color: #2864dc;
}

.btn-modifier {
  color: #d18a19;
}

.btn-supprimer {
  color: #d94343;
}

.actions button:hover {
  filter: brightness(0.94);
}

.aucun-resultat {
  text-align: center;
  padding: 30px;
  color: #8994a7;
}

/* Responsive */
@media (max-width: 1100px) {
  .statistiques {
    grid-template-columns: repeat(2, 1fr);
  }

  .filtres {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 650px) {
  .page-evaluations {
    padding: 15px;
  }

  .entete {
    align-items: flex-start;
    flex-direction: column;
  }

  .statistiques {
    grid-template-columns: 1fr;
  }

  .filtres {
    grid-template-columns: 1fr;
  }
}
</style>


<template>
  <div class="page-sessions">

    <!-- En-tête -->
    <div class="entete">
      <div>
        <h1>Gestion des sessions</h1>
        <p>Gérez les périodes d'organisation des examens.</p>
      </div>

      <button class="btn-ajouter" @click="$router.push('/dashboard/creeSession')">
        + Créer une session
      </button>
    </div>

    <!-- Cartes de résumé -->
    <div class="cartes-statistiques">

      <div class="carte">
        <div class="icone bleu">📅</div>
        <div>
          <p>Total des sessions</p>
          <h2>{{ sessions.length }}</h2>
        </div>
      </div>

      <div class="carte">
        <div class="icone vert">✓</div>
        <div>
          <p>Sessions normales</p>
          <h2>{{ sessionsNormales }}</h2>
        </div>
      </div>

      <div class="carte">
        <div class="icone orange">↻</div>
        <div>
          <p>Sessions de rattrapage</p>
          <h2>{{ sessionsRattrapage }}</h2>
        </div>
      </div>

      <div class="carte">
        <div class="icone violet">◷</div>
        <div>
          <p>Sessions terminées</p>
          <h2>{{ sessionsTerminees }}</h2>
        </div>
      </div>

    </div>

    <div class="section-sessions">

      <div class="section-entete">
        <h2>Liste des sessions</h2>

        <input
          type="text"
          v-model="recherche"
          placeholder="Rechercher une session..."
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Numéro Session</th>
            <th>Intitulé</th>
            <th>Type</th>
            <th>Année universitaire</th>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Statut</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="session in sessionsFiltrees"
            :key="session.idsession"
          >
            <td>{{ session.numsession }}</td>
            <td>{{ session.libelesession }}</td>
            <td>{{ session.typesession }}</td>
            <td>{{ session.annersession }}</td>
           <td>{{ formaterDate(session.datedebutsession) }}</td>
<td>{{ formaterDate(session.datefinsession) }}</td>
            <td>
              <span class="statut">{{ session.statutsession }}</span>
            </td>
          </tr>

          <tr v-if="sessionsFiltrees.length === 0">
            <td colspan="7" class="aucun-resultat">
              Aucune session trouvée.
            </td>
          </tr>
        </tbody>
      </table>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const recherche = ref('')
const listeSession = ref([])
const route = useRoute()

// Chargement des sessions
async function ChargeSession() {
  try {
    const reponseSession = await axios.get(
      'http://localhost:3000/svrorg/listeSession'
    )

    listeSession.value = reponseSession.data

    if (listeSession.value.length === 0) {
      alert("Aucune session n'a été programmée")
    }

  } catch (erreur) {
    console.error('Erreur de chargement:', erreur)
    alert('Erreur de chargement !')
  }
}

// Chargement au démarrage
onMounted(() => {
  ChargeSession()
})

// Filtrage et recherche des sessions
const sessionsFiltrees = computed(() => {
  const texte = recherche.value.trim().toLowerCase()
  const idSession = route.query.idSession

  return listeSession.value.filter(session => {

    const correspondId = !idSession ||
      String(session.idsession) === String(idSession)

   const correspondRecherche =
  session.numsession?.toLowerCase().includes(texte) ||
  session.libelesession?.toLowerCase().includes(texte) ||
  session.typesession?.toLowerCase().includes(texte) ||
  String(session.annersession ?? '').toLowerCase().includes(texte) ||
  String(session.datedebutsession ?? '').toLowerCase().includes(texte) ||
  String(session.datefinsession ?? '').toLowerCase().includes(texte)

    return correspondId && correspondRecherche
  })
})

// Liste complète des sessions
const sessions = listeSession

// Statistiques
const sessionsNormales = computed(() => {
  return listeSession.value.filter(
    session => session.typesession?.toLowerCase() === 'normale'
  ).length
})

const sessionsRattrapage = computed(() => {
  return listeSession.value.filter(
    session => session.typesession?.toLowerCase() === 'rattrapage'
  ).length
})

const sessionsTerminees = computed(() => {
  return listeSession.value.filter(session => {
    const statut = session.statutsession?.toLowerCase()
    return statut === 'terminée' || statut === 'terminee'
  }).length
})

function formaterDate(date) {
  if (!date) return ''

  const [annee, mois, jour] = date.split('-')

  return `${jour}-${mois}-${annee}`
}

</script>

<style scoped>
.page-sessions {
  padding: 25px;
  background: #f5f7fb;
  min-height: 100vh;
}

/* En-tête */
.entete {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.entete h1 {
  font-size: 25px;
  color: #1e293b;
  margin-bottom: 8px;
}

.entete p {
  color: #64748b;
  font-size: 14px;
}

.btn-ajouter {
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 7px;
  cursor: pointer;
}

/* Cartes */
.cartes-statistiques {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.carte {
  background: white;
  padding: 22px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.carte p {
  color: #64748b;
  font-size: 13px;
  margin-bottom: 8px;
}

.carte h2 {
  color: #1e293b;
  font-size: 25px;
}

.icone {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

.bleu { background: #dbeafe; }
.vert { background: #dcfce7; }
.orange { background: #ffedd5; }
.violet { background: #ede9fe; }

/* Tableau */
.section-sessions {
  background: white;
  padding: 22px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.section-entete {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-entete h2 {
  font-size: 18px;
  color: #1e293b;
}

.section-entete input {
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
  font-size: 13px;
}

th {
  background: #f8fafc;
  color: #475569;
}

.statut {
  background: #dcfce7;
  color: #15803d;
  padding: 5px 10px;
  border-radius: 15px;
}

.aucun-resultat {
  text-align: center;
  color: #64748b;
  padding: 25px;
}

/* Adaptation mobile */
@media (max-width: 900px) {
  .cartes-statistiques {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .cartes-statistiques {
    grid-template-columns: 1fr;
  }

  .entete, .section-entete {
    align-items: flex-start;
    flex-direction: column;
    gap: 15px;
  }

  .section-sessions {
    overflow-x: auto;
  }

  table {
    min-width: 650px;
  }
}
</style>
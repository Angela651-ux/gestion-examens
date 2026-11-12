<template>
  <div class="page-session">

    <!-- En-tête -->
    <div class="entete">
      <div>
        <h1>Sessions normales</h1>
        <p>Consultez et gérez les sessions normales d'examens.</p>
      </div>

      <button class="btn-ajouter" @click="creerSession">
        <span>＋</span> Créer une session
      </button>
    </div>

    <!-- Statistiques -->
    <div class="statistiques">

      <div class="carte-statistique">
        <div class="stat-info">
          <p>Total des sessions normales</p>
          <h2>{{ totalSessions }}</h2>
        </div>
        <div class="stat-icone bleu">📋</div>
      </div>

      <div class="carte-statistique">
        <div class="stat-info">
          <p>Sessions en cours</p>
          <h2>{{ sessionsEnCours }}</h2>
        </div>
        <div class="stat-icone vert">📅</div>
      </div>

      <div class="carte-statistique">
        <div class="stat-info">
          <p>Sessions terminées</p>
          <h2>{{ sessionsTerminees }}</h2>
        </div>
        <div class="stat-icone orange">✓</div>
      </div>

    </div>

    <!-- Liste des sessions -->
    <div class="contenu-tableau">

      <div class="tableau-entete">
        <div>
          <h2>Liste des sessions normales</h2>
          <p>Retrouvez toutes les sessions normales enregistrées.</p>
        </div>

        <div class="recherche">
          <span>⌕</span>
          <input
            type="text"
            v-model="recherche"
            placeholder="Rechercher une session..."
          />
        </div>
      </div>

      <!-- Tableau -->
      <div class="tableau-responsive">
        <table>
          <thead>
            <tr>
              <th>N° Session</th>
              <th>Libellé</th>
              <th>Année universitaire</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="session in sessionsFiltrees"
              :key="session.id"
            >
              <td>{{ session.numsession }}</td>

              <td class="libelle">
                {{ session.libelesession }}
              </td>

              <td>{{ session.annersession }}</td>

              <td>{{ formaterDate(session.datedebutsession) }}</td>

              <td>{{ formaterDate(session.datefinsession) }}</td>

              <td>
                <span
                  class="statut"
                  :class="{
                    'statut-encours': session.statutsession === 'En cours',
                    'statut-termine': session.statutsession === 'Terminée',
                    'statut-attente': session.statutsession === 'À venir'
                  }"
                >
                  {{ session.statutsession }}
                </span>
              </td>

              <td>
                <div class="actions">
                  <button
                    class="btn-consulter"
                    title="Consulter"
                    @click="consulterSession(session)"
                  >
                    👁
                  </button>

                  <button
                    class="btn-modifier"
                    title="Modifier"
                    @click="modifierSession(session)"
                  >
                    ✎
                  </button>

                  <button
                    class="btn-supprimer"
                    title="Supprimer"
                    @click="supprimerSession(session)"
                  >
                    🗑
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="sessionsFiltrees.length === 0">
              <td colspan="7" class="aucun-resultat">
                Aucune session normale trouvée.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed, onMounted} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Navigation vers le formulaire de création
const modifierSession = (session) => {
  router.push({
    name: 'modifierSession',
    params: {
      id: session.idsession
    }
  })
}

const creerSession = () =>{
  router.push({
    name: 'creeSession'
  })
}

const sessions= ref([])

async function ChargeSession() {
  try {
    const reponseSession = await axios.get(
      'http://localhost:3000/svrorg/listeSession'
    )

    sessions.value = reponseSession.data

    if (sessions.value.length === 0) {
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

// Champ de recherche
const recherche = ref('')

// Filtrer uniquement les sessions normales
const sessionsFiltrees = computed(() => {
  return sessions.value.filter(session => {
    const texte = recherche.value.toLowerCase()

    return (
      session.typesession.toLowerCase() === 'normale' &&
      (
        session.numsession.toLowerCase().includes(texte) ||
        session.libelesession.toLowerCase().includes(texte) ||
        session.annersession.toLowerCase().includes(texte) ||
        session.datedebutsession.includes(texte) ||
        session.datefinsession.includes(texte) ||
        session.statutsession.toLowerCase().includes(texte)
      )
    )
  })
})

// Statistiques
const totalSessions = computed(() => {
  return sessions.value.filter(
    session => session.typesession.toLowerCase() === 'normale'
  ).length
})

const sessionsEnCours = computed(() => {
  return sessions.value.filter(
    session =>
      session.typesession.toLowerCase() === 'normale' &&
      session.statutsession === 'En cours'
  ).length
})

const sessionsTerminees = computed(() => {
  return sessions.value.filter(
    session =>
      session.typesession.toLowerCase() === 'normale' &&
      session.statutsession === 'Effectuée'
  ).length
})

// Transformer YYYY-MM-DD en DD-MM-YYYY
function formaterDate(date) {
  if (!date) return ''

  const [annee, mois, jour] = date.split('-')
  return `${jour}-${mois}-${annee}`
}

// Consulter une session
function consulterSession(session) {
  alert(
    `Session : ${session.numsession}\n` +
    `Libellé : ${session.libelesession}\n` +
    `Année universitaire : ${session.annersession}`
  )
}


const supprimerSession = async (session) => {
  if (!session || !session.idsession) {
    alert("Impossible de supprimer cette session : ID introuvable.");
    return;
  }


  const confirmation = confirm(
    `Voulez-vous vraiment supprimer la session "${session.libelesession}" ?`
  );

  if (!confirmation) {
    return;
  }

  try {
    await axios.delete(
      `http://localhost:3000/svrorg/supprimerSession/${session.idsession}`
    );

    alert("Session supprimée avec succès !");

    await ChargeSession();

  } catch (erreur) {
    console.error("Erreur lors de la suppression :", erreur);
    alert("Une erreur est survenue lors de la suppression.");
  }
};
</script>
<style scoped>
.page-session {
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
  margin-bottom: 7px;
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
  font-size: 14px;
  font-weight: 600;
}

.btn-ajouter:hover {
  background: #1d4ed8;
}

/* Statistiques */
.statistiques {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.carte-statistique {
  background: white;
  padding: 22px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.stat-info p {
  color: #64748b;
  font-size: 13px;
  margin-bottom: 12px;
}

.stat-info h2 {
  font-size: 27px;
  color: #1e293b;
}

.stat-icone {
  width: 45px;
  height: 45px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 21px;
}

.bleu {
  background: #dbeafe;
  color: #2563eb;
}

.vert {
  background: #dcfce7;
  color: #16a34a;
}

.orange {
  background: #ffedd5;
  color: #ea580c;
}

/* Tableau */
.contenu-tableau {
  background: white;
  border-radius: 10px;
  padding: 22px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.tableau-entete {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  gap: 15px;
}

.tableau-entete h2 {
  font-size: 18px;
  color: #1e293b;
  margin-bottom: 6px;
}

.tableau-entete p {
  color: #94a3b8;
  font-size: 13px;
}

/* Recherche */
.recherche {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  padding: 9px 12px;
  width: 270px;
  color: #64748b;
}

.recherche input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 13px;
}

/* Tableau */
.tableau-responsive {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 850px;
}

thead {
  background: #f8fafc;
}

th {
  color: #64748b;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  padding: 15px 12px;
  white-space: nowrap;
}

td {
  padding: 16px 12px;
  border-bottom: 1px solid #f1f5f9;
  color: #475569;
  font-size: 13px;
}

.libelle {
  color: #1e293b;
  font-weight: 600;
}

/* Statuts */
.statut {
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.statut-encours {
  background: #dcfce7;
  color: #15803d;
}

.statut-termine {
  background: #e2e8f0;
  color: #475569;
}

.statut-attente {
  background: #fef3c7;
  color: #b45309;
}

/* Actions */
.actions {
  display: flex;
  gap: 8px;
}

.actions button {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #f1f5f9;
}

.btn-consulter {
  color: #2563eb;
}

.btn-modifier {
  color: #d97706;
}

.btn-supprimer {
  color: #dc2626;
}

.actions button:hover {
  opacity: 0.7;
}

/* Aucun résultat */
.aucun-resultat {
  text-align: center;
  padding: 30px;
  color: #94a3b8;
}

/* Responsive */
@media (max-width: 900px) {
  .statistiques {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .page-session {
    padding: 15px;
  }

  .entete,
  .tableau-entete {
    flex-direction: column;
    align-items: flex-start;
  }

  .statistiques {
    grid-template-columns: 1fr;
  }

  .recherche {
    width: 100%;
  }
}
</style>

<template>
  <div class="page-ajout">

    <!-- En-tête -->
    <div class="entete">
      <div>
        <h1>Ajouter une évaluation</h1>
        <p>Enregistrez une nouvelle évaluation et sa programmation.</p>
      </div>

      <button type="button" class="btn-retour" @click="retourListe">
        ← Retour
      </button>
    </div>

    <form  @submit.prevent="enregistrerEvaluation">

      
      <div class="partie-superieure">

        <!-- Formulaire d'ajout -->
        <div class="carte formulaire-principal">

          <div class="section-titre">
            <span>📋</span>
            <div>
              <h3>Informations générales</h3>
              <p>Renseignez les informations de l'évaluation.</p>
            </div>
          </div>

          <div class="grille-formulaire">

            <div class="champ">
              <label>Code Evaluation <span>*</span></label>
              <input
              v-model="codeEv"
                type="text"
                required
                readonly
              />
            </div>

            <div class="champ">
              <label>Intitulé de l'évaluation <span>*</span></label>
              <input
              v-model="libEv"
                type="text"
                placeholder="Ex : Examen final"
                required
              />
               <p v-if="erreurlibEv" class="erreur">{{ erreurlibEv}}</p>
            </div>

            <div class="champ">
              <label>Type d'épreuve <span>*</span></label>
              <select  v-model="typeEv" required>
                <option value="" disabled>Sélectionner un type</option>
                <option value="pratique">Epreuve pratique</option>
                <option value="theorique"">Epreuve théorique</option>
              </select>
               <p v-if="erreurtypeEv" class="erreur">{{ erreurtypeEv}}</p>
            </div>

            <div class="champ">
              <label>Session <span>*</span></label>
              <select v-model="sess" required>
                <option value="" disabled>Sélectionner une session</option>
                <option v-for="s in session" :key="s.idsession" :value="s.idsession">{{s.libelesession}}></option>
                
              </select>
               <p v-if="erreurSess" class="erreur">{{ erreurSess}}</p>
            </div>

            <div class="champ">
              <label>Unité d'enseignement (UE) <span>*</span></label>
              <select v-model="ueEv" required>
                <option value="" disabled>Sélectionner une UE</option>
               <option v-for=" u in ue" :key="u.idue" :value="u.idue">{{ u.libeleue }}</option>
              </select>
               <p v-if="erreurueEv" class="erreur">{{ erreurueEv}}</p>
            </div>

            <div class="champ">
              <label>Élément constitutif (EC) <span>*</span></label>
              <select required v-model="ecEv">
                <option value="" disabled>Sélectionner un EC</option>
                <option v-for="e in ec" :key="e.idec" :value="e.idec">{{ e.nomec }}</option>
                
              </select>
               <p v-if="erreurecEv" class="erreur">{{ erreurecEv}}</p>

            </div>


            <div class="champ">
              <label>Statut <span>*</span></label>
              <select  v-model="statutEv" required>
                <option value="">Sélectionner un statut</option>
                <option value="A venir">À venir</option>
                <option value="En cours">En cours</option>
                <option value="Effectuée">Effectuée</option>
              </select>
               <p v-if="erreurstatutEv" class="erreur">{{ erreurstatutEv}}</p>
            </div>

             <div class="champ">
              <label>Date de l'évaluation<span>*</span></label>
              <input
              v-model="dateEv"
                type="date"
                required
              />
               <p v-if="erreurdateEv" class="erreur">{{ erreurdateEv}}</p>
            </div>

          </div>

        
        </div>

        <!-- Informations du créateur -->
<div class="carte carte-createur">

  <div class="section-titre">
    <span>👤</span>
    <div>
      <h3>Créateur de l'évaluation</h3>
      <p>Informations du compte connecté</p>
    </div>
  </div>

  <div class="profil-createur">

    <div class="avatar">
      {{ utilisateurConnecte?.prenom?.charAt(0) }}
    </div>

    <h3>{{ nomCreateur }}</h3>

    <span class="role-createur">
      {{ roleCreateur }}
    </span>

    <span class="badge-connecte">
      ● Connecté
    </span>

  </div>

  <div class="infos-createur">

    <div class="info-ligne">
      <span>Adresse e-mail</span>
      <strong>{{ mailCreateur }}</strong>
    </div>

  

    <div class="info-ligne">
      <span>Fonction</span>
      <strong>{{ roleCreateur }}</strong>
    </div>

  </div>

  <div class="message-lecture">
    🔒 Ces informations ne sont pas modifiables.
  </div>

</div>
        <button
          type="button"
          class="btn-reinitialiser"
        
        >
          ↶ Réinitialiser
        </button>

        <button type="submit" class="btn-enregistrer">
          💾 Enregistrer l'évaluation
        </button>

      </div>
      </form>
      
      <form>

      <!-- DEUXIEME PARTIE : PROGRAMMATION -->
      <div class="carte programmation">

        <div class="section-titre">
          <span>🗓️</span>
          <div>
            <h3>Programmation de l'évaluation</h3>
            <p>Définissez la date, l'heure, la durée et les responsables.</p>
          </div>
        </div>

        <div class="grille-programmation">

          <div class="champ">
            <label>Date de l'évaluation <span>*</span></label>
            <input
              type="date"
              
              required
            />
          </div>

          <div class="champ">
            <label>Heure de début <span>*</span></label>
            <input
              type="time"
              
              required
            />
          </div>

          <div class="champ">
            <label>Durée <span>*</span></label>
            <select required>
              <option value="">Sélectionner une durée</option>
              <option value="1 heure">1 heure</option>
              <option value="1 heure 30">1 heure 30</option>
              <option value="2 heures">2 heures</option>
              <option value="3 heures">3 heures</option>
              <option value="4 heures">4 heures</option>
            </select>
          </div>

          <div class="champ">
            <label>Salle <span>*</span></label>
            <select  required>
              <option value="">Sélectionner une salle</option>
             
            </select>
          </div>

          <div class="champ">
            <label>Enseignant responsable <span>*</span></label>
            <select  required>
              <option value="">Sélectionner un enseignant</option>
             
              
            </select>
          </div>

        </div>

      </div>

      <!-- BOUTONS -->
      <div class="actions-formulaire">

        <button
          type="button"
          class="btn-reinitialiser"
        
        >
          ↶ Réinitialiser
        </button>

        <button type="submit" class="btn-enregistrer">
          💾 Programmmer l'évaluation
        </button>

      </div>

    </form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref  , onMounted ,computed} from 'vue';
import axios from 'axios';


const router = useRouter();

const codeEv = ref('')
const libEv = ref('')
const typeEv = ref('')
const sess = ref('')
const ueEv = ref('')
const ecEv = ref('')
const statutEv = ref('')
const dateEv= ref('')

const erreurlibEv = ref('')
const erreurtypeEv = ref('')
const erreurSess = ref('')
const erreurueEv = ref('')
const erreurecEv = ref('')
const erreurdateEv = ref('')
const erreurstatutEv = ref ('')

const ec = ref([])
const ue= ref([])
const session= ref([])

const codeEvaluation = async() => {
      try{
        const codeEvaluation = await axios.get(
          'http://localhost:3000/svrorg/CodeEval'
        )
        codeEv.value = codeEvaluation.data.codeevaluation

        console.log ('Evaluation charger:', codeEv.value)
      }catch(erreur){
        console.error('Erreur de chargement:' , erreur)
      }
    }
    
const utilisateurConnecte = ref(null)

onMounted(async () => {

  // 1. Récupérer l'utilisateur connecté
  const utilisateur = localStorage.getItem('utilisateurConnecte')

  if (utilisateur) {
    try {
      utilisateurConnecte.value = JSON.parse(utilisateur)

      console.log('Utilisateur connecté :', utilisateurConnecte.value)

    } catch (erreur) {
      console.error('Erreur de lecture utilisateur :', erreur)
    }
  } else {
    console.error('Aucun utilisateur connecté trouvé dans localStorage')
  }

  // 2. Charger le code de l'évaluation
  await codeEvaluation()

  // 3. Charger les UE, EC et sessions
  try {

    const reponseue = await axios.get(
      'http://localhost:3000/svrpedag-ec/listeUe'
    )

    ue.value = reponseue.data
    console.log('UE chargées :', ue.value)

    const reponseec = await axios.get(
      'http://localhost:3000/svrpedag-ec/ListeEC'
    )

    ec.value = reponseec.data
    console.log('EC chargés :', ec.value)

    const reponsesession = await axios.get(
      'http://localhost:3000/svrorg/listeSession'
    )

    session.value = reponsesession.data
    console.log('Sessions chargées :', session.value)

  } catch (erreur) {
    alert('Erreur de chargement')
    console.error('Erreur de chargement :', erreur)
  }

})

// 4. Informations du créateur
const nomCreateur = computed(() => {
  const u = utilisateurConnecte.value

  return u ? `${u.prenom} ${u.nom}` : 'Inconnu'
})

const roleCreateur = computed(() =>
  utilisateurConnecte.value?.role || ''
)

const mailCreateur = computed(() =>
  utilisateurConnecte.value?.email || ''
)
const idCreateur = computed(() => {
  return utilisateurConnecte.value?.id || null
})

    

function retourListe() {
  router.push('/dashboard/evaluations')
}

const enregistrerEvaluation = async() => {
  erreurlibEv.value= ''
  erreurtypeEv.value= ''
  erreurSess.value = ''
  erreurueEv.value = ''
  erreurecEv.value = ''
  erreurstatutEv.value = ''
  erreurdateEv.value = ''

  if(!libEv.value.trim()){
    erreurlibEv.value = 'Veillez renseignez ce champs'
    return
  }

  if(!typeEv.value){
    erreurtypeEv.value= 'Veillez séléctionner un epreuve'
    return
  }

  if(!sess.value){
    erreurSess.value= 'veillez choisir la session dont se deroulera l\' examen'
    return
  }

  if(!ueEv.value){
    erreurueEv.value = 'veillez séléctionné un Ue'
    return
  }

  if(!ecEv.value){
    erreurecEv.value = 'veillez séléctionné un Ec '
    return
  }

  if(!statutEv.value){
    erreurstatutEv.value = 'veillez séléctionné un statut'
    return
  }

  if(!dateEv.value){
    erreurstatutEv.value = 'veillez choisir une date'
    return
  }

  const donnee ={
 codeevaluation : codeEv.value,
        libeleevaluation: libEv.value,
        typeepreuve: typeEv.value,
        idsession: sess.value,
        idec: ecEv.value,
        statutevaluation : statutEv.value,
        dateevaluation: dateEv.value,
        idchef : idCreateur.value
  }

  try{
    const Ev = await axios.post(
      'http://localhost:3000/svrorg/enregistrerEv',
       donnee
    )

  alert('Evaluation ajouter avec succès')
  }catch(erreur){
    console.error('Erreur de chargement:' , erreur)
  }
}
</script>

<style scoped>
.page-ajout {
  min-height: 100vh;
  padding: 25px;
  background: #f5f7fb;
  font-family: Arial, sans-serif;
  color: #263247;
}

/* En-tête */
.entete {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
}

.entete h1 {
  margin: 0 0 8px;
  color: #172b4d;
  font-size: 25px;
}

.entete p {
  margin: 0;
  color: #8793a7;
  font-size: 13px;
}

.btn-retour {
  padding: 11px 16px;
  border: 1px solid #d7dfec;
  border-radius: 7px;
  background: white;
  color: #34445e;
  cursor: pointer;
}

/* Partie supérieure */
.partie-superieure {
  display: grid;
  grid-template-columns: minmax(0, 2.4fr) minmax(230px, 0.9fr);
  gap: 18px;
  align-items: stretch;
}

/* Cartes */
.carte {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.025);
  min-width: 0;
}

.section-titre {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 17px;
  margin-bottom: 20px;
  border-bottom: 1px solid #edf0f5;
}

.section-titre > span {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  background: #eaf1ff;
  font-size: 20px;
}

.section-titre h3 {
  margin: 0 0 6px;
  color: #203d70;
  font-size: 16px;
}

.section-titre p {
  margin: 0;
  color: #8995a8;
  font-size: 12px;
}

/* Formulaire général */
.grille-formulaire {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.champ {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.champ label {
  font-size: 13px;
  font-weight: 600;
  color: #43516a;
}

.champ label span {
  color: #e14b4b;
}

.champ input,
.champ select,
.champ textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d8e0eb;
  border-radius: 6px;
  padding: 11px 12px;
  background: white;
  color: #34445e;
  font-size: 13px;
  outline: none;
}

.champ input,
.champ select {
  height: 42px;
}

.champ textarea {
  resize: vertical;
}

.champ input:focus,
.champ select:focus,
.champ textarea:focus {
  border-color: #2864dc;
  box-shadow: 0 0 0 3px rgba(40, 100, 220, 0.08);
}

.champ select:disabled {
  background: #f1f3f7;
  cursor: not-allowed;
}

.champ small {
  color: #d34b4b;
  font-size: 11px;
}

.description {
  margin-top: 20px;
}

/* Carte créateur */
.carte-createur {
  display: flex;
  flex-direction: column;
}

.carte-createur .section-titre {
  margin-bottom: 15px;
}

.profil-createur {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px 0 20px;
}

.avatar {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e4edff;
  color: #2864dc;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 12px;
}

.profil-createur h3 {
  font-size: 15px;
  color: #263247;
  margin: 0 0 8px;
}

.role-createur {
  font-size: 12px;
  color: #687891;
  margin-bottom: 10px;
}

.badge-connecte {
  color: #258451;
  background: #e5f6ed;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 600;
}

.infos-createur {
  border-top: 1px solid #edf0f5;
  padding-top: 15px;
}

.info-ligne {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
  overflow-wrap: anywhere;
}

.info-ligne span {
  color: #8995a8;
  font-size: 11px;
}

.info-ligne strong {
  color: #34445e;
  font-size: 12px;
  font-weight: 600;
}

.message-lecture {
  margin-top: auto;
  padding: 10px;
  background: #f4f7fc;
  border-radius: 6px;
  color: #66758c;
  font-size: 11px;
  text-align: center;
}

/* Programmation en bas */
.programmation {
  margin-top: 18px;
}

.grille-programmation {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

/* Boutons */
.actions-formulaire {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
  padding-bottom: 15px;
}

.btn-reinitialiser,
.btn-enregistrer {
  min-height: 43px;
  padding: 0 18px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.btn-reinitialiser {
  color: #43516a;
  background: white;
  border: 1px solid #d8e0eb;
}

.btn-enregistrer {
  color: white;
  background: #2864dc;
  border: 1px solid #2864dc;
}

.btn-enregistrer:hover {
  background: #174db8;
}

/* Responsive */
@media (max-width: 950px) {
  .partie-superieure {
    grid-template-columns: minmax(0, 1fr);
  }

  .grille-programmation {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .page-ajout {
    padding: 15px;
  }

  .entete {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .grille-formulaire,
  .grille-programmation {
    grid-template-columns: 1fr;
  }

  .actions-formulaire {
    flex-direction: column;
  }

  .actions-formulaire button {
    width: 100%;
  }
}
</style>

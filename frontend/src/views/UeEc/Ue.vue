
<template>
  <div class="containerUE">
    <div class="titre-page">
      <div>
        <h1>Gestion des UE et des EC</h1>
        <p>Créer, consulter, modifier et supprimer les UE et leurs EC.</p>
      </div>
      <button class="btn-primary" @click="OuvrirFormulaire">+ Nouvelle UE</button>

      <div v-if="formulaireVisible" class="overlay">
  <div class="formulaire">
    <h2>Nouvelle unité d'enseignement</h2>

    <form @submit.prevent="enregistrerUE">
      <label>Code UE</label>
      <input v-model="codeUe" readonly>

      <label>Libellé</label>
      <input type="text" placeholder="Ex : Mathématiques" v-model="libeleUe" required>
      <p v-if="erreurLib" class="erreur">{{ erreurLib }}</p>

      <label>Statut</label>
      <select v-model="statueUe" required>
        <option value="">Choisir un statut</option>
        <option value="Actif">Actif</option>
        <option value="Inactif">Inactif</option>
      </select>
      <p v-if="erreurstatut" class="erreur">{{ erreurstatut}}</p>


<label>Niveau</label>
      <select v-model="NiveauUe" required>
        <option value="" disabled>Choisir un niveau</option>
        <option value="L1">Licence 1</option>
        <option value="L2">Licence 2</option>
        <option value="L3">Licence 3</option>
        <option value="M1">Master 1</option>
        <option value="M2">Master 2</option>
      </select>
      <p v-if="erreurNiveau" class="erreur">{{ erreurNiveau}}</p>


      <select v-model="semestreUe">
  <option value="">Choisir un semestre</option>

  <option
    v-for="s in semestresDetailsDisponibles"
    :key="s"
    :value="s"
  >
    {{ s }}
  </option>
</select>

      

     <select v-model="idparcours">
  <option value="" disabled>
    Sélectionner un parcours
  </option>

  <option
    v-for="p in parcoursFiltres"
    :key="p.idparcours"
    :value="p.idparcours"
  >
    {{ p.libeleparcours }}
  </option>
</select>

<p v-if="erreurParcours" class="erreur">
  {{ erreurParcours }}
</p>

      <div class="boutons">
        <button type="button" @click="formulaireVisible = false">
          Annuler
        </button>

        <button type="submit">
          Enregistrer
        </button>
      </div>
    </form>
  </div>
</div>
    </div>

    <div class="contenu-UE">

      <section class="affichageUE">
        <h2>Liste des UE</h2>

        <div class="search-box">
          <input type="text" placeholder="Rechercher une UE...">
        </div>

        <div class="tableau">
          <table>
            <thead>
              <tr>
                <th>Code UE</th>
                <th>Libellé</th>
                <th>Semestre</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ue in listeUE" :key="ue.idue">
              <td>{{ ue.codeue }}</td>
              <td>{{ ue.libeleue }}</td>
              <td>{{ ue.semestre }}</td>
              <td><button @click="selectionnerUE(ue)">✏️</button></td>
              <td><button @click="SupprimerUE(ue)">🗑️</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      
      <section class="detailsUE">

        <div class="formulaireUE">
          <h2>Détails de l'UE</h2>

          <div class="champsUE">
            <label>Code UE
              <input  v-model="detailleUE.codeUe" type="text" placeholder="Ex : UE1">
            </label>

            <label>Libellé
              <input  v-model="detailleUE.libeleUe" type="text" placeholder="Nom de l'UE">
            </label>

             
      <select v-model=" detailleUE.statueUe" required>
        <option value="">Choisir un statut</option>
        <option value="Actif">Actif</option>
        <option value="Inactif">Inactif</option>
      </select>

          <select v-model="detailleUE.semestreUe">
  <option value="">Choisir un semestre</option>

  <option
    v-for="s in semestresDetailsDisponibles"
    :key="s"
    :value="s"
  >
    {{ s }}
  </option>
</select>

        
     <select v-model="detailleUE.NiveauUe">
  <option value="">Choisir un niveau</option>

  <option
    v-for="p in niveauxDisponibles"
    :key="p"
    :value="p"
  >
    {{ p }}
  </option>
</select>
      
      <select v-model="detailleUE.idparcours">
  <option
    v-for="p in parcours"
    :key="p.idparcours"
    :value="p.idparcours"
  >
    {{ p.libeleparcours }}
  </option>
</select>

          <div class="boutons">
            <button @click="modifierUe" class="btn-primary">Enregistrer</button>
            <button class="btn-secondary">Annuler</button>
            <button class="btn-delete">Supprimer</button>
          </div>
        </div>
        </div>

        <div class="listeEC">
          <div class="titreEC">
            <h2>Éléments constitutifs (EC)</h2>
            <button class="btn-primary">+ Ajouter un EC</button>
          </div>

          <div class="tableau">
            <table>
              <thead>
                <tr>
                  <th>Numéro EC</th>
                  <th>Intitulé</th>
                  <th>Crédits</th>
                  <th>Enseignant</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- Les EC de l'UE sélectionnée seront affichés ici -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Formulaire d'ajout d'un EC -->
        <div class="ajouterEC">
          <h3>Ajouter un EC</h3>

          <div class="champsEC">
            <label>Numéro EC
              <input type="text" placeholder="Ex : EC1.1">
            </label>

            <label>Intitulé
              <input type="text" placeholder="Nom de l'EC">
            </label>

            <label>Crédits
              <input type="number" placeholder="Ex : 2">
            </label>

            <label>Enseignant
              <input type="text" placeholder="Nom de l'enseignant">
            </label>
          </div>

          <div class="boutons">
            <button class="btn-primary">Enregistrer</button>
            <button class="btn-secondary">Annuler</button>
          </div>
        </div>

      </section>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref,watch} from 'vue'
import axios from 'axios';


const formulaireVisible = ref(false)

function OuvrirFormulaire() {
formulaireVisible.value = true
}

 const codeUe = ref('')
 const libeleUe = ref('')
  const statueUe = ref('')
  const semestreUe = ref('')
 const NiveauUe = ref('')
 const idparcours = ref('')
 
 const erreurLib = ref('')
 const erreurstatut= ref('')
 const erreursemestre= ref('')
 const erreurNiveau= ref('')
 const erreurParcours= ref('')
 
 const parcours = ref([])

 const listeUE = ref([])
 const UEselectionner = ref(null)

 const detailleUE= ref({
  codeUe :'',
  libeleUe: '',
  statueUe: '',
  semestreUe: '',
  NiveauUe: '',
  idparcours: '',
 })


 const semestresParNiveau = {
  L1: ['S1', 'S2'],
  L2: ['S3', 'S4'],
  L3: ['S5', 'S6'],
  M1: ['S7', 'S8'],
  M2: ['S9', 'S10'],

}

const semestresDisponibles = computed(() => {
  return semestresParNiveau[NiveauUe.value] || []
})

watch(NiveauUe, () => {
  semestreUe.value = ''
})

const parcoursFiltres = computed(() => {
  return parcours.value.filter(
    p => p.niveau === NiveauUe.value
  )
})

watch(NiveauUe, () => {
  idparcours.value = ''
})



  

onMounted(async ()=>{
  try{
 
const reponseParcours = await axios.get(
  'http://localhost:3000/svrpedag-parcours/parcours'
)

parcours.value = reponseParcours.data
console.log('Parcours chargés :', parcours.value)

await ChargeUe();


  }catch(erreur){
console.error('Erreur de chargement:', erreur)

  }
})

const chargerProchainCode = async () => {
  try {
    const reponse = await axios.get(
      'http://localhost:3000/svrpedag-ue/prochain-code'
    )

    codeUe.value = reponse.data.codeue
  } catch (erreur) {
    console.error('Erreur lors du chargement du code UE :', erreur)
  }
}
onMounted(() => {
  chargerProchainCode()
})

const enregistrerUE = async () => {
  erreurLib.value= ''
  erreurstatut.value= ''
  erreursemestre.value= ''
  erreurNiveau.value= ''
  erreurParcours.value = ''

  if(!libeleUe.value.trim()){
    erreurLib.value = 'Veillez renseignée se champs'
    return
  }
   if(!statueUe.value){
    erreurstatut.value = 'Veillez séléctionner un statut'
    return
  }
   if(!semestreUe.value){
    erreursemestre.value = 'Veillez selectionnée un semestre'
    return
  }
   if(!NiveauUe.value){
    erreurNiveau.value = 'veillez selectionné un niveau'
    return
  }
   if(!idparcours.value){
    erreurParcours.value = 'Veillez séléctionné un parcours'
    return
  }

  try{
    const reponse = await axios.post(
      'http://localhost:3000/svrpedag-ue/enregistrerUE',{
  codeue: codeUe.value,
  libeleue: libeleUe.value,
  statueue: statueUe.value,
  semestre: semestreUe.value,
  idparcours: idparcours.value

      }
    )
    console.log(reponse.data)

    alert('UE ajoutées avec succès!')

    libeleUe.value =''
    statueUe.value= ''
    semestreUe.value=''
    NiveauUe.value=''
    idparcours.value= ''

await chargerProchainCode()

await ChargeUe()

  }catch(erreur){
    console.error('Echec de l\' ajout')
  }
}

  function selectionnerUE(ue) {
     console.log('UE reçue :', JSON.stringify(ue, null, 2))

  UEselectionner.value = ue

  detailleUE.value = {
    codeUe: ue.codeue ?? '',
    libeleUe: ue.libeleue ?? '',
    statueUe: ue.statueue ?? '',
    semestreUe: ue.semestre ?? '',
    NiveauUe: ue.parcours?.niveau ?? '',
    idparcours: ue.parcours?.idparcours ?? ''
  }
}
  async function ChargeUe() {
    try{
      const reponseListeUe = await axios.get(
  'http://localhost:3000/svrpedag-ue/listeUE'
)
 listeUE.value = reponseListeUe.data


 if(listeUE.value.length > 0){

  const dernieUE = [...listeUE.value].sort(
    (a ,b) => b.idue - a.idue
  )[0]
selectionnerUE(dernieUE) 
}


    }catch (erreur){
      console.error('Erreur de Chargement:' , erreur)
    }
    
    
  }
  const semestresDetailsDisponibles = computed(() => {
  return ['S1' , 'S2', 'S3' , 'S4','S5' , 'S6','S7' , 'S8','S9' , 'S10']

})

const niveauxDisponibles = computed(() => {
  return ['L1', 'L2', 'L3', 'M1', 'M2']
})

const modifierUe = async () => {
  try {
    const id = UEselectionner.value.idue

    const donnee = {
      codeue: detailleUE.value.codeUe,
      libeleue: detailleUE.value.libeleUe,
      statueue: detailleUE.value.statueUe,
      semestre: detailleUE.value.semestreUe,
      idparcours: detailleUE.value.idparcours
    }

    console.log("ID de l'UE :", id)
    console.log("Données envoyées :", donnee)

    await axios.put(
      `http://localhost:3000/svrpedag-ue/modifierUE/${id}`,
      donnee
    )

    alert('Modification enregistrée avec succès !')

    await ChargeUe()

  } catch (erreur) {
    console.error('Erreur de modification :', erreur)
    console.log('Réponse backend :', erreur.response?.data)
    alert('Erreur de modification !')
  }
}
const SupprimerUE = async (ue) =>{
  const confirmation = confirm(  `Voulez-vous vraiment supprimer l'UE ${ue.codeue} ?`)

  if(!confirmation){
    return
  }

  try{
    await axios.delete(
      `http://localhost:3000/svrpedag-ue/supprimerUE/${ue.idue}`
    )

    alert('UE supprimé avec succèes')
    await ChargeUe()

await chargerProchainCode()

  }catch(erreur){
    console.error('Erreur de suppression', erreur)
  }
}

</script>


<style scoped>
.containerUE {
  padding: 24px;
  background: #f5f8fc;
  min-height: 100%;
  color: #243b5a;
  box-sizing: border-box;
}

/* Titre et bouton Nouvelle UE */
.titre-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.titre-page h1 {
  margin: 0 0 8px;
  font-size: 26px;
}

.titre-page p {
  margin: 0;
  color: #718096;
}

/* Les deux colonnes principales */
.contenu-UE {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.2fr);
  gap: 16px;
  align-items: start;
}

/* Cartes principales */
.affichageUE,
.detailsUE {
  min-width: 0;
  background: white;
  border: 1px solid #dce6f3;
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
}

.affichageUE h2,
.detailsUE h2 {
  margin: 0 0 16px;
  font-size: 18px;
}

/* Recherche */
.search-box {
  margin-bottom: 16px;
}

.search-box input {
  width: 100%;
  padding: 11px;
  border: 1px solid #d5e0ef;
  border-radius: 6px;
  box-sizing: border-box;
}

/* Tableaux */
.tableau {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e0e8f2;
  border-radius: 6px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 12px 10px;
  border-bottom: 1px solid #e7edf5;
  font-size: 13px;
  white-space: nowrap;
}

th {
  background: #f0f5fb;
  color: #304969;
}

tbody tr:hover {
  background: #f5f9ff;
}

/* Les blocs de droite s'empilent verticalement */
.detailsUE {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.formulaireUE,
.listeEC,
.ajouterEC {
  min-width: 0;
  padding: 14px;
  border: 1px solid #dce6f3;
  border-radius: 7px;
}

.champsUE,
.champsEC {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.champsEC {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

label {
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-size: 13px;
  font-weight: 600;
}

input,
select {
  width: 100%;
  min-width: 0;
  padding: 10px;
  border: 1px solid #d5e0ef;
  border-radius: 5px;
  box-sizing: border-box;
  background: white;
}

/* Boutons */
.boutons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

button {
  padding: 10px 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background: #1877f2;
  color: white;
}

.btn-secondary {
  background: #edf1f6;
  color: #344760;
}

.btn-delete {
  background: #ef4444;
  color: white;
}

/* Titre de la liste des EC */
.titreEC {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.titreEC h2 {
  margin: 0;
}

.ajouterEC h3 {
  margin-top: 0;
}

/* Adaptation aux petits écrans */
@media (max-width: 900px) {
  .contenu-UE {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 550px) {
  .containerUE {
    padding: 12px;
  }

  .titre-page {
    align-items: flex-start;
    flex-direction: column;
  }

  .champsUE,
  .champsEC {
    grid-template-columns: 1fr;
  }

  .titreEC {
    align-items: flex-start;
    flex-direction: column;
  }
}
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 1000;
}

.formulaire {
  background: white;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 8px 30px #00000025;
}

.formulaire h2 {
  color: #17365d;
  margin-top: 0;
  margin-bottom: 20px;
}

.formulaire form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.formulaire label {
  font-size: 14px;
  font-weight: 600;
}

.formulaire input,
.formulaire select {
  width: 100%;
  padding: 10px;
  border: 1px solid #d5e0ef;
  border-radius: 5px;
  box-sizing: border-box;
}

.boutons {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}
.erreur {
  color: #dc2626;
  font-size: 13px;
  margin-top: 5px;
  margin-bottom: 10px;
  font-weight: 500;
}

@media (max-width: 500px) {
  .formulaire form {
    grid-template-columns: 1fr;
  }
}
</style>

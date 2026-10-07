<template>
    <div class="Login">
        <div class="login-text">
<h1>Gestions des examens</h1>
<p>Université de Fianarantsoa</p>
        </div>
        <div class="login-logo">
            <h2>Espace Etudiant</h2>
            <p>Acceder à votre espace pour consulter 
                vos notes , vos convocation et gérer votre 
                parcours universitaire.
            </p>
        </div>
        <div class="login-footer">
            <p>"Un étudiant aujourd'hui un professionnel demain"</p>
        </div>
        <div class="formulaire">
            <h3>Connexion-Etudiant</h3>
            <p>Entrez vos étudiants pour accèder à votre espace</p>
            <form>
                <div class="login-form">
                    <input type="email" id="email" placeholder="Adresse e-mail ou numero étudiant">
                </div>
                <div class="login-form">
                    <input type="password" id="password" placeholder="Mot de passe">
                </div>
                <div class="login-form">
                    <RouterLink to="/">Mot de passe oublié?</RouterLink>
                </div>
                <div class="login-form">
                    <button>Se connecter</button>
                </div>
                <div class="login-form"><p>ou</p></div>
                <div class="login-form">
                    <p>Pas encore de compte? 
                        <RouterLink to="/inscriptionEtudiant">S'inscrire</RouterLink>
                    </p>
                </div>
     <RouterLink to="/home">Retour à l'acceuil</RouterLink>

            </form>
        </div>
    </div>
</template>
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, sendEmailVerification, User, IdTokenResult } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { ProfilI } from '../modeles/profil-i';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** User's data */
  profil: ProfilI = <ProfilI>{};

  /** Accessing Firebase
   * @param auth Firebase object to authentication
  */
  constructor(public auth: Auth, private route: Router) {
  }
  /**
   * Create account on firebase with email and password
   * @param p Object with email and password transmitted from connection form
   */
  // creeUser(p: any) {
  //   createUserWithEmailAndPassword(this.auth, p.mail, p.pass)
  //     .then((retour) => {
  //       console.log("Utilisateur créé", retour);
  //       // this.l.msg.msgOk(this.l.t['MSG_US_ADD'], this.l.t['MSG_US_ADD_DESCR']);
  //     })
  //     .catch((error) => {
  //       if (error.code == 'auth/email-already-in-use') {
  //         // this.l.msg.msgFail(this.l.t['MSG_ER_US_DEJA'], this.l.t['MSG_ER_US_DEJA_DESCR']);
  //       } else {
  //         // this.l.msg.msgFail(this.l.t['MSG_ER_DATA'], this.l.t['MSG_ER_DATA_DESCR']);
  //       }
  //       console.log(error.code, error.message);
  //     });
  // }
  /**
   * User connection with email and password in firebase
   * @param mail User's email
   * @param mdp User's password
   */
  idUser(f: { mail: string, pass: string }) {
    console.log("Connexion", f);
    /**
     * Get authentication from user's credentials
     * @param {Auth} auth Authentication object from Firebase admin SDK
     * @param {string} connexion.mail Email from id form
     * @param {string} connexion.pass Password from id form
     */
    signInWithEmailAndPassword(this.auth, f.mail, f.pass)
      .then((r) => {
        if (this.getAccess()) {
          this.route.navigateByUrl('/intranet')
        } else {
          console.log("Erreur dans la connexion, vérifiez vos identifiants");
        };
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  }
  /** Reset password process */
  resetPassword(email: string) {
    sendPasswordResetEmail(this.auth, email, { url: `${window.location.protocol}//${window.location.hostname}/?email=${email}` })
      .then(id => {
        console.log("Utilisateur connecté", id)
      })
      .catch(er => console.log("Erreur dans le reset", er))
  }
  /** User di */
  deconnexion() {
    signOut(this.auth).then(() => {
      this.route.navigateByUrl('/');
    }).catch((er) => {
      console.log('Problème dans la déconnexion', er);
    });
  };
  /** Resend verification email */
  verificationEmail() {
    sendEmailVerification(this.auth.currentUser!)
      .then(d => {
        this.route.navigateByUrl('/');
        console.log(d)
      })
      .catch(er => console.log(er));
  }
  /** Giving admin access to contents */
  getAdmin() {
    if (!this.auth.currentUser!) {
      this.route.navigateByUrl('/');
    } else if (this.auth.currentUser! && !this.auth.currentUser!.hasOwnProperty('emailVerified')) {
      this.route.navigateByUrl('/verification');
    } else if (this.auth.currentUser!) return true;
    return false;
  }
  /** Giving user access to contents */
  getAccess() {
    console.log(this.auth.currentUser);
    if (this.auth.currentUser!) {
      return true;
    }
    return false;
  }
}

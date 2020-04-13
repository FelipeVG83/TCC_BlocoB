import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
	providedIn: 'root'
})
export class ImageService {
	ref: any;
	task: any;

	constructor(private af: AngularFireStorage, private db: AngularFireDatabase) { }

	public nomeImagem() {
		return Math.random().toString(36).substring(2);
	}

	public uploadImagem(nome, file) {
		this.ref = this.af.ref(nome);
		this.task = this.ref.put(file);
	}
}

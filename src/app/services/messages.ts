import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class Messages {
  
  async guardarMensaje(email: string, mensaje: string)
  {
    const nuevaLinea = `${ new Date().toISOString() } | ${ email } | ${ mensaje }`;
    console.log("guardarMensaje() "+nuevaLinea);

    if (Capacitor.getPlatform() == "web") {
      console.log("estás en navegador");
      localStorage.setItem('correo', email);
      localStorage.setItem('mensaje', mensaje);

    } else {
      console.log("estás en mobile");
      const dato = email;
      const archivo = await Filesystem.readFile({
        path: 'mensajes.txt',
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });

      archivo.data = dato;
      console.log(archivo);

      if ( await this.checkFileExists('mensajes.txt') ) {

        Filesystem.stat({
          path: 'mensajes.txt',
          directory: Directory.Documents
        });

        await Filesystem.writeFile({
          path: 'mensajes.txt',
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
          data: dato
        });
        
      } else {
        console.log("No existe el fichero");
      }


    } 

  }

  leerMensaje() {
    console.log("leerMensaje()");
  }

  consultarPlataforma() {
    console.log(Capacitor.getPlatform());
  }

  async checkFileExists(fileName: string): Promise<boolean> {
    try {
      await Filesystem.stat({
        path: fileName,
        directory: Directory.Documents // O el directorio que estés usando (Data, Cache, etc.)
      });
      return true; // El archivo existe
    } catch (error) {
      // Si el error indica que no existe, devolvemos false
      if ((error as any).message.includes('does not exist')) {
        return false;
      }
      // Si es otro error (ej. permisos), lo lanzamos
      throw error;
    }
  }

}

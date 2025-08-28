/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package TPO1.TecnicaDom_EDT;

/**
 *
 * @author santt
 */
public class Nodo {

    // Atributos:
    // 'elem' almacena el elemento (dato) que guarda este nodo.
    // 'enlace' es una referencia (puntero) al siguiente nodo en la lista enlazada.
    private Object elem;
    private Nodo enlace;

    /**
     * Constructor del nodo.
     * @param elem   Elemento que se guarda en este nodo.
     * @param enlace Referencia al siguiente nodo.
     */
    public Nodo(Object elem, Nodo enlace) {
        this.elem = elem;
        this.enlace = enlace;
    }

    /**
     * Establece un nuevo elemento para este nodo.
     * @param elem Elemento a guardar.
     */
    public void setElem(Object elem) {
        this.elem = elem;
    }

    /**
     * Establece el enlace (referencia) al siguiente nodo.
     * @param enlace Nodo siguiente.
     */
    public void setEnlace(Nodo enlace) {
        this.enlace = enlace;
    }

    /**
     * Obtiene el elemento almacenado en este nodo.
     * @return el elemento de tipo Object.
     */
    public Object getElem() {
        return elem;
    }

    /**
     * Obtiene la referencia (puntero) al siguiente nodo.
     * @return el siguiente nodo (Nodo).
     */
    public Nodo getEnlace() {
        return enlace;
    }
}

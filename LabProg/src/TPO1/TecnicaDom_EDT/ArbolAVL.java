/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package TPO1.TecnicaDom_EDT;

import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
//import java.util.concurrent.atomic.AtomicBoolean;

import TPO1.utiles.Resultado;
import TPO1.TecnicaDom.BusquedaParalela;


/**
 *
 * @author G16
 */
public class ArbolAVL {

    // 'raiz' es la referencia al nodo raíz (NodoAVL) de este árbol.
    private NodoAVL raiz;

    private ForkJoinPool forkJoinPool;

    /**
     * Constructor del árbol AVL, inicializa la raíz en null.
     */
    public ArbolAVL() {
        this.raiz = null;
    }

    /**
     * Inserta un elemento en el árbol AVL, manteniendo el equilibrio.
     *
     * @param elemento El elemento Comparable que se desea insertar.
     * @return true si se insertó con éxito, false si el elemento ya existía.
     */
    public boolean insertar(Comparable elemento) {

        // Usamos un arreglo booleano para "transportar" el éxito de la inserción
        // a través de la recursividad.
        boolean[] exito = {false};
        //System.out.println("inserta elemento: " + elemento.toString());

        // Si el árbol está vacío, el nuevo nodo pasa a ser la raíz.
        if (this.raiz == null) {
            this.raiz = new NodoAVL(elemento, null, null);
            exito[0] = true;
        } else {
            // Llamada al método recursivo para insertar
            this.raiz = insertarAux(this.raiz, elemento, exito);
        }

        // Si realmente se insertó, recalculamos altura de la raíz y balanceamos.
        if (exito[0]) {
            this.raiz.recalcularAltura();
            this.raiz = balancear(this.raiz);
        }

        //System.out.println(this.toString());
        //System.out.println("--");
        return exito[0];
    }

    /**
     * Método recursivo que busca la posición correcta para insertar un nuevo
     * elemento, y re-equilibra el subárbol en caso necesario.
     *
     * @param nPadre Nodo en el que estamos trabajando.
     * @param elemento Elemento Comparable a insertar.
     * @param exito Arreglo de 1 posición que usaremos como "bandera" de éxito.
     * @return El posible nuevo nodo padre luego de balancear.
     */
    private NodoAVL insertarAux(NodoAVL nPadre, Comparable elemento, boolean[] exito) {

        // Comparamos el elemento a insertar con el contenido de nPadre
        if (!nPadre.getElemento().equals(elemento)) {
            // Si no son iguales, decidimos hacia qué hijo ir
            if (nPadre.getElemento().compareTo(elemento) > 0) {
                // El elemento es menor => vamos al hijo izquierdo
                if (nPadre.getIzquierdo() != null) {
                    nPadre.setIzquierdo(insertarAux(nPadre.getIzquierdo(), elemento, exito));
                } else {
                    // Si no existe el hijo izquierdo, creamos un nodo nuevo
                    NodoAVL nHijo = new NodoAVL(elemento, null, null);
                    nPadre.setIzquierdo(nHijo);
                    exito[0] = true;
                }
            } else {
                // El elemento es mayor => vamos al hijo derecho
                if (nPadre.getDerecho() != null) {
                    nPadre.setDerecho(insertarAux(nPadre.getDerecho(), elemento, exito));
                } else {
                    // Si no existe el hijo derecho, se crea un nodo nuevo
                    NodoAVL nHijo = new NodoAVL(elemento, null, null);
                    nPadre.setDerecho(nHijo);
                    exito[0] = true;
                }
            }
        }

        // Si pudimos insertar un nuevo nodo en algún lugar del subárbol:
        if (exito[0]) {
            // Recalculamos la altura del padre
            nPadre.recalcularAltura();
            // Balanceamos en caso de ser necesario
            nPadre = balancear(nPadre);
        }

        return nPadre;
    }

    /**
     * Elimina un elemento del árbol AVL, manteniendo el equilibrio.
     *
     * @param elemento Elemento a eliminar.
     * @return true si se eliminó con éxito, false si no se encontraba.
     */
    public boolean eliminar(Comparable elemento) {
        boolean[] exito = {false};

        // Si el árbol no está vacío, intentamos eliminar recursivamente
        if (this.raiz != null) {
            this.raiz = eliminarAux(this.raiz, elemento, exito);
        }

        // Si se eliminó y la raíz no es null, recalculamos y balanceamos
        if (exito[0] && this.raiz != null) {
            this.raiz.recalcularAltura();
            balancear(this.raiz);
        }

        return exito[0];
    }

    /**
     * Método recursivo para eliminar un elemento de un subárbol AVL.
     *
     * @param nodo Subárbol que estamos procesando.
     * @param elemento Elemento a eliminar.
     * @param exito Arreglo de 1 posición donde confirmamos si se logró
     * eliminar.
     * @return El posible nuevo nodo padre, tras efectuar balanceo.
     */
    private NodoAVL eliminarAux(NodoAVL nodo, Comparable elemento, boolean[] exito) {

        if (nodo != null) {
            if (nodo.getElemento().equals(elemento)) {
                // Caso en que encontramos el elemento a eliminar
                if (nodo.getDerecho() != null && nodo.getIzquierdo() != null) {
                    // El nodo tiene ambos hijos
                    // Buscamos el "candidato" (mínimo del subárbol derecho, por ejemplo)
                    nodo.setElemento(candidato(nodo));
                    // Eliminamos el candidato que ahora está duplicado en el hijo derecho
                    nodo.setDerecho(eliminarAux(nodo.getDerecho(), nodo.getElemento(), exito));
                } else if (nodo.getDerecho() != null) {
                    // Solo tiene hijo derecho
                    nodo = nodo.getDerecho();
                } else if (nodo.getIzquierdo() != null) {
                    // Solo tiene hijo izquierdo
                    nodo = nodo.getIzquierdo();
                } else {
                    // No tiene hijos, es un nodo hoja
                    nodo = null;
                }
                exito[0] = true;
            } else if (nodo.getElemento().compareTo(elemento) > 0) {
                // Buscamos por el subárbol izquierdo
                nodo.setIzquierdo(eliminarAux(nodo.getIzquierdo(), elemento, exito));
            } else {
                // Buscamos por el subárbol derecho
                nodo.setDerecho(eliminarAux(nodo.getDerecho(), elemento, exito));
            }
        }

        // Si se logró eliminar y el nodo actual no es nulo, recalculamos altura y balanceamos.
        if (exito[0] && nodo != null) {
            nodo.recalcularAltura();
            nodo = balancear(nodo);
        }

        return nodo;
    }

    /**
     * Método para hallar el "candidato" en la eliminación de un nodo con dos
     * hijos. Retorna el elemento mínimo encontrado en el subárbol derecho.
     *
     * @param nodo El nodo que se está procesando (que tiene subárbol derecho).
     * @return El elemento que reemplazará al nodo a eliminar.
     */
    private Comparable candidato(NodoAVL nodo) {
        // Buscamos el menor elemento en el subárbol derecho
        NodoAVL aux = nodo.getDerecho();
        while (aux.getIzquierdo() != null) {
            aux = aux.getIzquierdo();
        }
        Comparable candidato = aux.getElemento();
        return candidato;
    }

    /**
     * Calcula el factor de balance de un nodo (altura subárbol izq - altura
     * subárbol der).
     *
     * @param nodo NodoAVL al que se le mide el balance.
     * @return Factor de balance del nodo.
     */
    private int balance(NodoAVL nodo) {
        int altIzq = -1;
        int altDer = -1;

        if (nodo.getIzquierdo() != null) {
            altIzq = nodo.getIzquierdo().getAltura();
        }

        if (nodo.getDerecho() != null) {
            altDer = nodo.getDerecho().getAltura();
        }

        // Factor = alturaIzq - alturaDer
        return altIzq - altDer;
    }

    /**
     * Verifica el factor de balance de un nodo y aplica las rotaciones
     * necesarias.
     *
     * @param nodo NodoAVL que puede requerir balance.
     * @return El nuevo nodo padre tras las rotaciones.
     */
    private NodoAVL balancear(NodoAVL nodo) {

        int balancePadre = balance(nodo);

        // Caso right-heavy (factor = -2)
        if (balancePadre == -2) {
            int balanceHijoDerecho = balance(nodo.getDerecho());
            if (balanceHijoDerecho <= 0) {
                // Rotación simple a la izquierda
                nodo = rotacionIzquierda(nodo);
            } else {
                // Rotación doble derecha-izquierda
                nodo = rotacionDerechaIzquierda(nodo);
            }
        } // Caso left-heavy (factor = 2)
        else if (balancePadre == 2) {
            int balanceHijoIzquierda = balance(nodo.getIzquierdo());
            if (balanceHijoIzquierda >= 0) {
                // Rotación simple a la derecha
                nodo = rotacionDerecha(nodo);
            } else {
                // Rotación doble izquierda-derecha
                nodo = rotacionIzquierdaDerecha(nodo);
            }
        }

        return nodo;
    }

    /**
     * Rotación simple a la derecha.
     *
     * @param r Nodo que actúa como pivote de la rotación.
     * @return El nuevo nodo padre tras la rotación.
     */
    private NodoAVL rotacionDerecha(NodoAVL r) {

        NodoAVL h = r.getIzquierdo();
        NodoAVL temp = h.getDerecho();

        // Reajustamos referencias
        h.setDerecho(r);
        r.setIzquierdo(temp);

        // Recalculamos alturas
        r.recalcularAltura();
        h.recalcularAltura();

        return h;
    }

    /**
     * Rotación simple a la izquierda.
     *
     * @param r Nodo que actúa como pivote de la rotación.
     * @return El nuevo nodo padre tras la rotación.
     */
    private NodoAVL rotacionIzquierda(NodoAVL r) {

        NodoAVL h = r.getDerecho();
        NodoAVL temp = h.getIzquierdo();

        h.setIzquierdo(r);
        r.setDerecho(temp);

        r.recalcularAltura();
        h.recalcularAltura();

        return h;
    }

    /**
     * Rotación doble derecha-izquierda. Se rota primero a la derecha el hijo
     * derecho, y luego a la izquierda el nodo.
     *
     * @param r Nodo que actúa como pivote de la rotación.
     * @return El nuevo nodo padre tras la rotación.
     */
    private NodoAVL rotacionDerechaIzquierda(NodoAVL r) {
        r.setDerecho(rotacionDerecha(r.getDerecho()));
        return rotacionIzquierda(r);
    }

    /**
     * Rotación doble izquierda-derecha. Se rota primero a la izquierda el hijo
     * izquierdo, y luego a la derecha el nodo.
     *
     * @param r Nodo que actúa como pivote de la rotación.
     * @return El nuevo nodo padre tras la rotación.
     */
    private NodoAVL rotacionIzquierdaDerecha(NodoAVL r) {
        r.setIzquierdo(rotacionIzquierda(r.getIzquierdo()));
        return rotacionDerecha(r);
    }

    /**
     * Verifica si un elemento pertenece al árbol AVL.
     *
     * @param elemento Elemento a buscar.
     * @return true si el elemento está en el árbol, false en caso contrario.
     */
    public boolean pertenece(Comparable elemento) {
        boolean retorno = false;
        if (this.raiz != null) {
            retorno = perteneceAux(this.raiz, elemento);
        }
        return retorno;
    }

    /**
     * Método recursivo de búsqueda de un elemento en el árbol.
     *
     * @param nodo Nodo actual que se está analizando.
     * @param elemento Elemento a buscar.
     * @return true si se encuentra, false de lo contrario.
     */
    private boolean perteneceAux(NodoAVL nodo, Comparable elemento) {
        boolean retorno = false;
        if (nodo != null) {
            // Comparamos el elemento con la raíz del subárbol
            if (nodo.getElemento().compareTo(elemento) == 0) {
                retorno = true;
            } else {
                // Si es menor, vamos a la izquierda, sino a la derecha
                if (nodo.getElemento().compareTo(elemento) > 0) {
                    retorno = perteneceAux(nodo.getIzquierdo(), elemento);
                } else {
                    retorno = perteneceAux(nodo.getDerecho(), elemento);
                }
            }
        }
        return retorno;
    }

    /**
     * Devuelve el elemento guardado en el árbol que sea igual a 'elemento', o
     * null si no existe.
     *
     * @param elemento Elemento buscado.
     * @return El elemento hallado, o null si no se encontró.
     */
    public Object obtenerElem(Comparable elemento) {
        Object elem = null;
        if (this.raiz != null) {
            elem = obtenerElemAux(this.raiz, elemento);
        }
        return elem;
    }

    /**
     * Método recursivo para encontrar un elemento en el árbol y retornarlo.
     *
     * @param nodo Subárbol donde buscamos.
     * @param elemento Elemento que se busca.
     * @return El elemento si se encuentra, o null en caso contrario.
     */
    private Object obtenerElemAux(NodoAVL nodo, Comparable elemento) {
        Object elem = null;
        if (nodo != null) {
            if (nodo.getElemento().compareTo(elemento) == 0) {
                elem = nodo.getElemento();
            } else {
                // Buscamos en hijo izquierdo o derecho según corresponda
                if (nodo.getElemento().compareTo(elemento) > 0) {
                    elem = obtenerElemAux(nodo.getIzquierdo(), elemento);
                } else {
                    elem = obtenerElemAux(nodo.getDerecho(), elemento);
                }
            }
        }
        return elem;
    }

    /**
     * Verifica si el árbol está vacío (sin nodos).
     *
     * @return true si no tiene nodos, false en caso contrario.
     */
    public boolean esVacio() {
        return this.raiz == null;
    }

    /**
     * Recorre el árbol en inorden (izq-raíz-der) y retorna una lista con sus
     * elementos ordenados.
     *
     * @return Lista con los elementos del árbol en inorden.
     */
    public Lista lista() {
        Lista retorno = new Lista();
        if (this.raiz != null) {
            listaAux(this.raiz, retorno);
        }
        return retorno;
    }

    /**
     * Recorre en inorden y va insertando los elementos en la lista.
     *
     * @param subRaiz Nodo actual en el recorrido.
     * @param retorno Lista donde agregamos los elementos.
     */
    private void listaAux(NodoAVL subRaiz, Lista retorno) {
        if (subRaiz != null) {
            listaAux(subRaiz.getIzquierdo(), retorno);
            retorno.insertar(subRaiz.getElemento(), retorno.longitud() + 1);
            listaAux(subRaiz.getDerecho(), retorno);
        }
    }

    /**
     * Retorna una lista con los elementos que están dentro de un rango [minimo,
     * maximo]. Se asume que minimo <= maximo. @p
     *
     *
     * @param minimo Valor mínimo del rango.
     * @param maximo Valor máximo del rango.
     * @return Lista con los elementos del árbol en ese rango.
     */
    public Lista listarRango(Comparable minimo, Comparable maximo) {
        Lista listaRango = new Lista();

        if (minimo.compareTo(maximo) <= 0 && this.raiz != null) {
            // En caso de que el mínimo sea menor o igual que el máximo
            listaRangoAux(this.raiz, listaRango, minimo, maximo);
        }

        return listaRango;
    }

    /**
     * Recorre el árbol y va insertando en la lista aquellos elementos que se
     * encuentran dentro del rango [minimo, maximo].
     *
     * @param subRaiz Nodo actual del subárbol.
     * @param retorno Lista donde vamos acumulando los elementos en rango.
     * @param minimo Valor mínimo.
     * @param maximo Valor máximo.
     */
    private void listaRangoAux(NodoAVL nodo, Lista retorno, Comparable minimo, Comparable maximo) {

        if (nodo != null) {
            // Visitamos el subárbol izquierdo si hay valores en el rango
            if (nodo.getElemento().compareTo(minimo) > 0) {
                listaRangoAux(nodo.getIzquierdo(), retorno, minimo, maximo);
            }

            // Si el elemento está en el rango, agregarlo a la lista
            if (nodo.getElemento().compareTo(minimo) >= 0 && nodo.getElemento().compareTo(maximo) <= 0) {
                retorno.insertar(nodo.getElemento(), retorno.longitud() + 1);
            }

            // Visitamos el subárbol derecho si hay valores en el rango
            if (nodo.getElemento().compareTo(maximo) < 0) {
                listaRangoAux(nodo.getDerecho(), retorno, minimo, maximo);
            }
        }
    }

    /**
     * Retorna el elemento mínimo del árbol (el más a la izquierda).
     *
     * @return El elemento mínimo si existe, de lo contrario null.
     */
    public Comparable minimoElem() {
        Comparable minimo = null;
        if (this.raiz != null) {
            NodoAVL aux = this.raiz;
            while (aux.getIzquierdo() != null) {
                aux = aux.getIzquierdo();
            }
            minimo = aux.getElemento();
        }
        return minimo;
    }

    /**
     * Retorna el elemento máximo del árbol (el más a la derecha).
     *
     * @return El elemento máximo si existe, de lo contrario null.
     */
    public Comparable maximoElem() {
        Comparable maximo = null;
        if (this.raiz != null) {
            NodoAVL aux = this.raiz;
            while (aux.getDerecho() != null) {
                aux = aux.getDerecho();
            }
            maximo = aux.getElemento();
        }
        return maximo;
    }

    /**
     * Crea un clon (copia superficial) de todo el árbol.
     *
     * @return Nuevo ArbolAVL con la misma estructura y elementos.
     */
    @Override
    public ArbolAVL clone() {
        ArbolAVL clon = new ArbolAVL();

        if (this.raiz != null) {
            // Clonamos la raíz
            clon.raiz = new NodoAVL(this.raiz.getElemento(), null, null);
            // Llamada recursiva para clonar el resto del árbol
            cloneAux(this.raiz, clon.raiz);
        }

        return clon;
    }

    /**
     * Método recursivo para clonar cada nodo (subárbol) en otro árbol.
     *
     * @param subRaiz Nodo actual del árbol original.
     * @param subRaizClone Nodo correspondiente en el árbol clon.
     */
    private void cloneAux(NodoAVL subRaiz, NodoAVL subRaizClone) {
        if (subRaiz != null) {
            // Clonamos el subárbol izquierdo
            if (subRaiz.getIzquierdo() != null) {
                subRaizClone.setIzquierdo(new NodoAVL(subRaiz.getIzquierdo().getElemento(), null, null));
                cloneAux(subRaiz.getIzquierdo(), subRaizClone.getIzquierdo());
            }
            // Clonamos el subárbol derecho
            if (subRaiz.getDerecho() != null) {
                subRaizClone.setDerecho(new NodoAVL(subRaiz.getDerecho().getElemento(), null, null));
                cloneAux(subRaiz.getDerecho(), subRaizClone.getDerecho());
            }
        }
    }

    /**
     * Vacía el árbol (pierde referencias) asignando null a la raíz.
     */
    public void vaciar() {
        this.raiz = null;
    }

    /**
     * Devuelve un String con la representación del árbol en preorden,
     * incluyendo la altura de cada nodo y sus hijos.
     *
     * @return String que describe el contenido y la estructura del árbol.
     */
    @Override
    public String toString() {
        String retorno = "Arbol vacio";
        if (this.raiz != null) {
            retorno = toStringAux(this.raiz);
        }
        return retorno;
    }

    /**
     * Método auxiliar recursivo para armar el String del árbol.
     *
     * @param raiz Nodo actual en el recorrido.
     * @return Cadena descriptiva de este subárbol.
     */
    private String toStringAux(NodoAVL raiz) {
        String retorno = "";
        if (raiz != null) {
            // Mostramos el elemento y su altura
            retorno = raiz.getElemento().toString() + " Al: " + raiz.getAltura() + " :";

            NodoAVL izquierdo = raiz.getIzquierdo();
            NodoAVL derecho = raiz.getDerecho();

            // Mostramos si tiene HI y HD
            if (izquierdo != null) {
                retorno = retorno + " HI:" + izquierdo.getElemento().toString();
            } else {
                retorno = retorno + " HI:-";
            }

            if (derecho != null) {
                retorno = retorno + " HD:" + derecho.getElemento().toString();
            } else {
                retorno = retorno + " HD:-";
            }

            retorno = retorno + "\n";

            // Recorremos recursivamente hijo izquierdo y derecho
            if (izquierdo != null) {
                retorno = retorno + toStringAux(izquierdo);
            }
            if (derecho != null) {
                retorno = retorno + toStringAux(derecho);
            }
        }
        return retorno;
    }

    public boolean buscarParalelo(Comparable elemento, int threshold) {
        boolean exito = false;

        if (raiz != null) {

            if (forkJoinPool == null) {
                forkJoinPool = new ForkJoinPool();
            }

            Resultado encontrado = new Resultado(false);
            Lock cerrojo = new ReentrantLock(); 
            //AtomicBoolean encontrado = new AtomicBoolean(false);

            BusquedaParalela task = new BusquedaParalela(raiz, elemento, threshold, encontrado, cerrojo);
            //BusquedaParalela task = new BusquedaParalela(raiz, elemento, threshold, encontrado);
            exito = forkJoinPool.invoke(task);
        }

        return exito;
    }

}

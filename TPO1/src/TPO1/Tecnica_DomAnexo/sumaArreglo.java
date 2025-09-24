package TPO1.Tecnica_DomAnexo;

/**
 *
 * @author gnzlz
 */
import java.util.concurrent.*;

public class sumaArreglo extends RecursiveTask<Double> {
    private static final int UMBRAL = 1000; // Umbral de 1000 posiciones
    private double[] notas;
    private int inicio, fin; // Limites a recorrer

    // Constructor que recibe el arreglo y los límites de la sección a procesar
    public sumaArreglo(double[] notas, int inicio, int fin) {
        this.notas = notas;
        this.inicio = inicio;
        this.fin = fin;
    }

    @Override 
    protected Double compute() {
        int medio = 0;
        double suma = 0, sumaIzquierda, sumaDerecha;
        
        // Si el tamaño del subarreglo es menor o igual al umbral, resolver secuencialmente
        if ((fin - inicio) <= UMBRAL) {
            
            for (int i = inicio; i < fin; i++) {
                suma += notas[i]; // sumamos las notas de esta porción
            }
        }
        else {
            // Caso contrario: dividir el problema en dos subtareas
            medio = (inicio + fin) / 2;

            // Creamos las subtareas para las dos mitades
            sumaArreglo izquierda = new sumaArreglo(notas, inicio, medio);
            sumaArreglo derecha = new sumaArreglo(notas, medio, fin);

            izquierda.fork(); // se forkea subtarea
            sumaDerecha = derecha.compute(); // procesa tarea actual en hilo actual
            sumaIzquierda = izquierda.join(); // se espera subtarea izqu
            suma = sumaIzquierda + sumaDerecha; // combina subtareas
        }
        
        return suma;
    }
}
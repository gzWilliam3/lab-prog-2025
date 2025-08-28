

package TPO1.Tecnica_DomAnexo;

/**
 * @author gnzlz
 */
import java.util.concurrent.*;

public class recorridoArreglo {

    public static void main(String[] args) {
        // Creamos un arreglo de notas aleatorias entre 0 y 10
        double[] notas = new double[100000];
        double sumaTotal, promedio;
        for (int i = 0; i < notas.length; i++) {
            notas[i] = Math.random() * 10;
        }

        ForkJoinPool pool = new ForkJoinPool(); // crea ek forkJoinPool
        sumaArreglo tarea = new sumaArreglo(notas, 0, notas.length); // tarea ppal que usa RecursiveTask

        sumaTotal = pool.invoke(tarea); // ejecucion tarea pool

        promedio = sumaTotal / notas.length; // calculo del promedio

        System.out.println("Promedio de notas: " + promedio);

    }

}

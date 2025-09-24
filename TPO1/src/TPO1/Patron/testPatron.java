

package TPO1.Patron;

/**
 * @author g16
 */
public class testPatron {

    public static void main(String[] args) {
        
        // Se crean las distintas Factorys concretas
        ProgramacionFactory factoryProg = new ProgramacionFactory();
        TeoriaCompFactory factoryTeoCom = new TeoriaCompFactory();
        IngSoftFactory factoryIngSoft = new IngSoftFactory();
        
        // Se utilizan las factorys para instanciar clases concretas
        Materia a1 = factoryProg.crearMateria("DA", "Carod");
        Materia a2 = factoryProg.crearMateria("POO", "Amaro");
        Materia a3 = factoryTeoCom.crearMateria("ETC", "Kogan");
        Materia a4 = factoryTeoCom.crearMateria("TC2", "Parra");
        Materia a5 = factoryIngSoft.crearMateria("IR", "De Renzis");
        Materia a6 = factoryIngSoft.crearMateria("MDD", "Cruz");
        
        // Uso de las clases
        System.out.println("*** IMPRESION DE DATOS ***");
        System.out.println(a1.getDatos());
        System.out.println(a2.getDatos());
        System.out.println(a3.getDatos());
        System.out.println(a4.getDatos());
        System.out.println(a5.getDatos());
        System.out.println(a6.getDatos());
        
        // Cuestiones particulares
        System.out.println("\n*** COMPORTAMIENTO PARTICULAR ***");
        System.out.println(((M_Programacion) a1).asignarProyectoProgramacion());
        System.out.println(((M_TeoriaComp) a4).evaluarAutomatas());
        System.out.println(((M_IngSoft)a5).diagramarCasosDeUso());
    }

}

package TPO1.Patron;

/**
 *
 * @author gnzlz
 */
public class TeoriaCompFactory implements MateriaFactory{
    // Clase Factory concreta. 
    
    // Redefine constructores implementados en la Factory Padre
    @Override
    public Materia crearMateria(){
        return new M_TeoriaComp();
    }
    
    @Override
    public Materia crearMateria(String nombre, String prof){
        Materia m = new M_TeoriaComp();
        m.setNombre(nombre);
        m.setProfesor(prof);
        
        return m;
    }
}

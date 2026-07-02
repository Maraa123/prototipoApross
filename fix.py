import re

with open('src/pages/AltaPostulante.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the broken fragment start from inside the header
content = content.replace('''                {estadoPostulacion === 'en_revision' ? (
                  <div style={{ backgroundColor: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: '8px', padding: '32px', textAlign: 'center', margin: '40px 0' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#B45309', marginBottom: '12px' }}>Postulación en Revisión</h3>
                    <p style={{ color: '#92400E', marginBottom: '24px', fontSize: '15px' }}>
                      Sus datos están siendo evaluados por nuestro equipo. Se le notificará una vez aprobada la postulación para continuar con la etapa de Inscripción.
                    </p>
                    <button
                      onClick={() => {
                        setEstadoPostulacion('aceptado')
                        navigate('/alta/datos-fiscales')
                      }}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#F59E0B',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '14px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      (Ejemplo) Simular Aprobación
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Stepper bar */}''', '''                {/* Stepper bar */}''')

# 2. Add it before the Stepper Wizard Header
replacement_start = '''            <>
              {estadoPostulacion === 'en_revision' ? (
                  <div style={{ backgroundColor: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: '8px', padding: '32px', textAlign: 'center', margin: '40px 0' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#B45309', marginBottom: '12px' }}>Postulación en Revisión</h3>
                    <p style={{ color: '#92400E', marginBottom: '24px', fontSize: '15px' }}>
                      Sus datos están siendo evaluados por nuestro equipo. Se le notificará una vez aprobada la postulación para continuar con la etapa de Inscripción.
                    </p>
                    <button
                      onClick={() => {
                        setEstadoPostulacion('aceptado')
                        navigate('/alta/datos-fiscales')
                      }}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#F59E0B',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '14px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      (Ejemplo) Simular Aprobación
                    </button>
                  </div>
                ) : (
                <>
              {/* Stepper Wizard Header */}'''
content = content.replace('''            <>
              {/* Stepper Wizard Header */}''', replacement_start)

# 3. Make sure the bottom part is correct.
# My previous replace was:
#                 </div>
#                   </>
#                 )}
#
#               </div>
#             </>
#           )}
#         </main>
# We need to make sure this is syntactically correct.
# Wait, let's just write the modified content back.
with open('src/pages/AltaPostulante.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")

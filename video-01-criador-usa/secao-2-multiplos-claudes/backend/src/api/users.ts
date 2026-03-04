import express from 'express';
import validator from 'validator';

const app = express();
app.use(express.json());

// Endpoint para criar usuário com validação de email
app.post('/api/users', (req, res) => {
  const { email, name } = req.body;

  // Validação de email usando biblioteca validator
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({
      error: 'Email inválido',
      message: 'Por favor, forneça um email válido'
    });
  }

  // Simulação de criação de usuário
  const user = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    name,
    createdAt: new Date().toISOString()
  };

  return res.status(201).json({
    success: true,
    user
  });
});

// Função auxiliar para validar email (usado em outros contextos)
export function validateEmail(email: string): boolean {
  return validator.isEmail(email);
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});

export default app;

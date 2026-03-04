import { validateCPF, formatCPF, validateAndFormat } from './cpf';

describe('validateCPF', () => {
  describe('CPFs válidos', () => {
    it('deve aceitar CPF válido sem formatação', () => {
      expect(validateCPF('12345678909')).toBe(true);
    });

    it('deve aceitar CPF válido com formatação', () => {
      expect(validateCPF('123.456.789-09')).toBe(true);
    });

    it('deve aceitar CPF 00000000191 (conhecido como válido)', () => {
      expect(validateCPF('00000000191')).toBe(true);
    });
  });

  describe('CPFs inválidos', () => {
    it('deve rejeitar CPF com tamanho incorreto', () => {
      expect(validateCPF('123456789')).toBe(false);
      expect(validateCPF('123456789012')).toBe(false);
    });

    it('deve rejeitar CPF com todos dígitos iguais', () => {
      expect(validateCPF('00000000000')).toBe(false);
      expect(validateCPF('11111111111')).toBe(false);
      expect(validateCPF('22222222222')).toBe(false);
      expect(validateCPF('99999999999')).toBe(false);
    });

    it('deve rejeitar CPF com primeiro dígito verificador inválido', () => {
      expect(validateCPF('12345678999')).toBe(false); // Último dígito correto seria 09
    });

    it('deve rejeitar CPF com segundo dígito verificador inválido', () => {
      expect(validateCPF('12345678901')).toBe(false); // Último dígito correto seria 09
    });

    it('deve rejeitar string vazia', () => {
      expect(validateCPF('')).toBe(false);
    });

    it('deve rejeitar CPF com letras', () => {
      expect(validateCPF('123abc78909')).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('deve lidar com CPF que contém espaços', () => {
      expect(validateCPF('123 456 789 09')).toBe(true);
    });

    it('deve lidar com CPF que contém caracteres especiais', () => {
      expect(validateCPF('123.456.789-09')).toBe(true);
      expect(validateCPF('123/456/789-09')).toBe(false); // Dígitos verificadores incorretos
    });
  });
});

describe('formatCPF', () => {
  it('deve formatar CPF válido para XXX.XXX.XXX-XX', () => {
    expect(formatCPF('12345678909')).toBe('123.456.789-09');
  });

  it('deve retornar string vazia para CPF com tamanho incorreto', () => {
    expect(formatCPF('123456789')).toBe('');
    expect(formatCPF('123456789012')).toBe('');
  });

  it('deve remover formatação existente antes de reformatar', () => {
    expect(formatCPF('123.456.789-09')).toBe('123.456.789-09');
  });

  it('deve lidar com string vazia', () => {
    expect(formatCPF('')).toBe('');
  });
});

describe('validateAndFormat', () => {
  it('deve retornar CPF formatado quando válido', () => {
    expect(validateAndFormat('12345678909')).toBe('123.456.789-09');
  });

  it('deve retornar null quando CPF inválido', () => {
    expect(validateAndFormat('11111111111')).toBeNull();
    expect(validateAndFormat('123456789')).toBeNull();
  });

  it('deve aceitar e formatar CPF já formatado', () => {
    expect(validateAndFormat('123.456.789-09')).toBe('123.456.789-09');
  });

  it('deve retornar null para string vazia', () => {
    expect(validateAndFormat('')).toBeNull();
  });
});

describe('TDD: Casos reais de uso', () => {
  it('formulário deve aceitar CPF válido do usuário', () => {
    const userInput = '123.456.789-09';
    const result = validateAndFormat(userInput);

    expect(result).not.toBeNull();
    expect(result).toBe('123.456.789-09');
  });

  it('formulário deve rejeitar CPF inválido com mensagem clara', () => {
    const userInput = '111.111.111-11';
    const result = validateAndFormat(userInput);

    expect(result).toBeNull();
    // No código real, você mostraria: "CPF inválido"
  });

  it('API deve validar CPF antes de salvar no banco', () => {
    const cpfFromRequest = '12345678909';

    if (!validateCPF(cpfFromRequest)) {
      throw new Error('CPF inválido');
    }

    // Se chegou aqui, CPF é válido e pode salvar
    expect(validateCPF(cpfFromRequest)).toBe(true);
  });
});

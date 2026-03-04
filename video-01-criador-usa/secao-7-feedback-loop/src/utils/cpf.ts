/**
 * Valida um CPF (Cadastro de Pessoa Física) brasileiro
 *
 * @param cpf - String contendo o CPF (apenas dígitos)
 * @returns true se o CPF é válido, false caso contrário
 *
 * @example
 * ```typescript
 * validateCPF('12345678909'); // true (CPF válido)
 * validateCPF('11111111111'); // false (dígitos repetidos)
 * validateCPF('123456789');   // false (tamanho incorreto)
 * ```
 */
export function validateCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');

  // CPF deve ter exatamente 11 dígitos
  if (cleanCPF.length !== 11) {
    return false;
  }

  // Rejeita CPFs com todos os dígitos iguais (ex: 111.111.111-11)
  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return false;
  }

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cleanCPF.charAt(9))) {
    return false;
  }

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cleanCPF.charAt(10))) {
    return false;
  }

  return true;
}

/**
 * Formata um CPF para o padrão XXX.XXX.XXX-XX
 *
 * @param cpf - String contendo o CPF (apenas dígitos)
 * @returns CPF formatado ou string vazia se inválido
 *
 * @example
 * ```typescript
 * formatCPF('12345678909'); // '123.456.789-09'
 * ```
 */
export function formatCPF(cpf: string): string {
  const cleanCPF = cpf.replace(/\D/g, '');

  if (cleanCPF.length !== 11) {
    return '';
  }

  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Valida e formata um CPF
 *
 * @param cpf - String contendo o CPF
 * @returns CPF formatado se válido, null se inválido
 *
 * @example
 * ```typescript
 * validateAndFormat('12345678909'); // '123.456.789-09'
 * validateAndFormat('11111111111'); // null (inválido)
 * ```
 */
export function validateAndFormat(cpf: string): string | null {
  if (!validateCPF(cpf)) {
    return null;
  }

  return formatCPF(cpf);
}

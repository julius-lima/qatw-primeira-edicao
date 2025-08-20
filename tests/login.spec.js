import { test, expect } from '@playwright/test'
import { obterCodigo2FA } from '../support/db'
import { LoginPage } from '../pages/LoginPage'
import { DashPage } from '../pages/DashPage'
import { cleanJobs, getJob } from '../support/redis'

test('Não deve logar quando o código de autenticação é inválido ', async ({ page }) => {

  const loginPage = new LoginPage(page)

  const usuario = {
    cpf: '00000014141',
    senha: '147258'
  }

  await loginPage.acessaPagina()
  await loginPage.informaCPF(usuario.cpf)
  await loginPage.informaSenha(usuario.senha)
  await loginPage.informa2FA('123456') // Código inválido

  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.')
})

test('Deve acessar a conta do usuário', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const dashPage = new DashPage(page)

  const usuario = {
    cpf: '00000014141',
    senha: '147258'
  }

  await cleanJobs() // limpa os jobs antes do teste

  await loginPage.acessaPagina()
  await loginPage.informaCPF(usuario.cpf)
  await loginPage.informaSenha(usuario.senha)

  await page.getByRole('heading', { name: 'Verificação em duas etapas' })
    .waitFor({timeout: 3000 })

  const codigo = await getJob() // obtém o código do job na fila

  //const codigo = await obterCodigo2FA(usuario.cpf)
  
  await loginPage.informa2FA(codigo)

  await expect(await dashPage.obterSaldo()).toHaveText('R$ 5.000,00')

})
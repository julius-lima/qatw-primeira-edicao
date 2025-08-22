import { Queue } from "bullmq";

const connection = {
  host: 'paybank-redis',
  port: 6379
};

const queueName = 'twoFactorQueue';

const queue = new Queue(queueName, { connection });

export const getJob = async () => {
  const jobs = await queue.getJobs() // busca todos os jobs na fila
  console.log(jobs[0].data.code) // exibe o primeiro job no console
  return jobs[0].data.code;  // retorna o primeiro job
}

export const cleanJobs = async () => {
  await queue.obliterate({ force: true }) // limpa todos os jobs na fila
}
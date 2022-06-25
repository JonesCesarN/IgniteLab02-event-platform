import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { useCreateSubscriberMutation } from '../graphql/generated'

const codeMackup = new URL('../assets/code-mackup.png', import.meta.url).href


export const Subscribre = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [createSubscriber, { loading }] = useCreateSubscriberMutation()

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault()

    await createSubscriber({
      variables: {
        name,
        email,
      },
    })

    navigate('/event')
  }

  return (
    <div className='min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center p-4'>
      <div className='w-full max-w-[1100px] flex flex-col lg:flex-row items-center justify-between mt-10 lg:mt-20 mx-auto'>
        <div className='max-w-[640px] flex flex-col items-center lg:block'>
          <Logo />
          <h1 className='mt-8 text-[1.25rem] lg:text-[2.5rem] leading-tight'>
            Construa uma <strong className='text-blue-500'>aplicação completa</strong>, do zero, com <strong className='text-blue-500'>React</strong>
          </h1>
          <p className='mt-4 text-gray-200 leading-relaxed text-center lg:text-left'>
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>

        <div className='p-8 bg-gray-700 border border-gray-500 rounded mt-[32px] lg:mt-0'>
          <strong className='text-2xl mg-6 block'>Inscreva-se gratuitamente</strong>

          <form onSubmit={handleSubscribe} className='flex flex-col gap-2 w-full'>
            <input
              className='bg-gray-900 rounded px-5 h-14'
              type="text"
              placeholder='Seu nome completo'
              onChange={e => setName(e.target.value)}
            />
            <input
              className='bg-gray-900 rounded px-5 h-14'
              type="email"
              placeholder='Digite seu e-mail'
              onChange={e => setEmail(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className='mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50'
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img src={codeMackup} className='mt-4 lg:mt-10' alt="" />
    </div>
  )
}

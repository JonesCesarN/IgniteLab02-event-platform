import classNames from 'classnames'
import { useState, FormEvent, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { auth, logout, sinInWithGithub } from '../firebase'
import { useCreateSubscriberMutation, useGetSubscriberGithubIdQuery as GetSubscriberGithubIdQuery } from '../graphql/generated'
const codeMackup = new URL('../assets/code-mackup.png', import.meta.url).href

interface IErrPage {
  name: boolean,
  email: boolean
}

export const Subscribre = () => {
  const [isGithub, setIsGithub] = useState(false)

  const [createSubscriber, { loading: loadingMutation }] = useCreateSubscriberMutation({ errorPolicy: 'all' })
  const [user, loading, error] = useAuthState(auth)

  const { data, error: errorsub, loading: loadingsub } = GetSubscriberGithubIdQuery({
    variables: {
      uidGithub: user?.uid
    },
    errorPolicy: 'all'
  })

  if (!loadingsub && !loadingMutation && !loading && !isGithub) {
    if (data?.subscribers.length === 0 && user?.email && user?.displayName) {
      createSubscriber({
        variables: {
          name: user.displayName,
          email: user.email,
          uidGithub: user.uid
        },
      })
    } else if (data?.subscribers.length === 1) {
      setIsGithub(true)
    }
  }

  const handleAuthGithub = (e: FormEvent) => {
    e.preventDefault();
    sinInWithGithub()
  }

  return (

    <div className='min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center p-4  overflow-hidden'>

      <div className='w-full max-w-[1100px] flex flex-col lg:flex-row items-center justify-between mt-10 mx-auto'>
        <div className='max-w-[640px] flex flex-col items-center lg:block'>
          <Logo />
          <h1 className='mt-8 text-[1.25rem] lg:text-[2.5rem] leading-tight'>
            Construa uma <strong className='text-blue-500'>aplicação completa</strong>, do zero, com <strong className='text-blue-500'>React</strong>
          </h1>
          <p className='mt-4 text-gray-200 leading-relaxed text-center lg:text-left'>
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>
        <div className='p-8 bg-gray-600 border border-gray-500 rounded mt-[32px] lg:mt-0 w-screen sm:w-[70%] md:w-[50%] lg:w-fit'>
          <strong className='text-lg lg:text-2xl mg-6 block'>
            {isGithub && user?.displayName ? `Olá ${user?.displayName}! Bem vindo` : 'Inscreva-se gratuitamente'}
          </strong>

          <div className='flex flex-col gap-2 w-full mt-4'>

            {isGithub && user?.displayName
              ? (
                <Link to="/event"
                  className='text-center mt-4 bg-green-500 uppercase py-2 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50'>
                  Ir para aulas
                </Link>
              )
              :
              (
                <button
                  disabled={loading}
                  className="flex justify-center items-center gap-4 py-2 rounded bg-github-100"
                  onClick={handleAuthGithub}>
                  <FaGithub />
                  Entre com o GitHub
                </button>
              )
            }
          </div>
        </div>
      </div>
      <img src={codeMackup} alt="" />
    </div>
  )
}

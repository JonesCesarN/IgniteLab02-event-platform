import classNames from 'classnames'
import { useState, FormEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthGithub } from '../components/AuthGithub'
import { Logo } from '../components/Logo'
import { useCreateSubscriberMutation } from '../graphql/generated'
const codeMackup = new URL('../assets/code-mackup.png', import.meta.url).href

export const Subscribre = () => {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)
  if (name.length > 0 && nameError) setNameError(false)

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)

  const [isRegister, setIsRegister] = useState(false)
  const [redirectTimeout, setRedirectTimeout] = useState(5)

  const [error, setError] = useState<string>('')

  const [createSubscriber, { loading }] = useCreateSubscriberMutation({ errorPolicy: 'all' })

  function redirectIsRegister() {

    setTimeout(function () {
      window.location.href = '/event';
    }, 5000);



  }

  useEffect(() => {
    let count = redirectTimeout
    if (isRegister) {
      setInterval(function () {
        count--
        setRedirectTimeout(count)
      }, 1000)
    }
  }, [isRegister, redirectTimeout, setRedirectTimeout])


  async function handleSubscribe(e: FormEvent) {
    e.preventDefault()

    if (!email) setEmailError(true)
    else setEmailError(false)

    if (!name) setNameError(true)

    try {
      await createSubscriber({
        variables: {
          name,
          email,
        },
      })
    } catch (err: any) {
      let message = err.networkError.result.errors[0].message
      if (message == 'value is not unique for the field "email"') {
        setIsRegister(true)
        redirectIsRegister()
      }
    }

    if (error) console.log(error)

    // navigate('/event')
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

        <div className='p-8 bg-gray-700 border border-gray-500 rounded mt-[32px] lg:mt-0 w-screen sm:w-[70%] md:w-[50%] lg:w-fit'>
          <strong className='text-lg lg:text-2xl mg-6 block'>{isRegister ? `Esse email já foi registrado!` : 'Inscreva-se gratuitamente'}</strong>

          <form onSubmit={handleSubscribe} className='flex flex-col gap-2 w-full mt-4'>
            <input
              className={classNames('bg-gray-900 rounded px-5 h-10 outline-none ', {
                'border border-red-500': nameError,
                'focus:outline-green-500 border-0': !nameError,
                'border-0 bg-transparent text-center text-2xl mt-6 disabled:hover:none text-green-700': isRegister
              })}
              type="email"
              disabled={isRegister ? true : false}
              placeholder='Digite seu e-mail'
              onChange={e => setEmail(e.target.value)}
            />
            <span className={classNames('text-xs bg-red-600 p-2 font-bold text-center mb-2 animate-pulse ', {
              'block': emailError,
              'hidden': !emailError,
            })}>
              Digite seu email para garantir a vaga.
            </span>
            <input
              className={classNames('bg-gray-900 rounded px-5 h-10 outline-none ', {
                'border border-red-500': nameError,
                'focus:outline-green-500 border-0': !nameError,
                'hidden': isRegister
              })}
              type="text"
              placeholder='Seu nome completo'
              onChange={e => setName(e.target.value)}
            />
            <span className={classNames('text-xs bg-red-600 p-2 font-bold text-center mb-2 animate-pulse ', {
              'block': nameError,
              'hidden': !nameError || isRegister,

            })}>
              Digite seu nome para garantir a vaga.
            </span>



            {isRegister
              ? (

                <Link to="/event" className='text-center mt-4 uppercase py-4 rounded font-bold text-sm text-blue-500  transition-colors disabled:opacity-50'>
                  <p>Redirecionando para aulas...</p>
                  <p>{redirectTimeout} segundos</p>
                </Link>

              )
              : (
                <>
                  <button
                    type="submit"
                    disabled={loading}
                    className='mt-4 bg-green-500 uppercase py-2 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50'
                  >
                    Garantir minha vaga
                  </button>
                  <span className='text-gray-300 text-center p-3 flex items-center separador justify-center' > ou, use social login </span>

                  <AuthGithub className="flex justify-center items-center gap-4 py-2 rounded bg-github-100" />
                </>
              )
            }




          </form>
        </div>
      </div>
      <img src={codeMackup} alt="" />
    </div>
  )
}

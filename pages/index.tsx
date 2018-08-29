import Link from 'next/link'

var aika = new Date().toDateString()

export default () =>
  <div>
    Tänään on{' '}
    {new Date().getDate()}{'.'}
    {new Date().getMonth()+1}{'.'}
    {new Date().getFullYear()}

  </div>

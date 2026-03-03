import Card from '../components/Card'
import Image from 'next/image'

const DashboardPage = () => {
  return (
    <div>
      <p className="text-sm font-semibold mb-2">This month ∨</p> {/* make this a dropdown */}
      <div className="flex gap-4">
        {/* someone do css bc this is disgusting */}
        <Card title="Total Trips" height={100} width={275}> 
          <div className="flex items-center gap-2 relative h-full">
            <Image src="/package.svg" alt="package" width={24} height={24} />
            <h1 className="text-3xl font-bold">240</h1>
            <div className="absolute bottom-3 right-1 flex gap-1">
              <Image src="/arrow.svg" alt="arrow" width={16} height={16} />
              <span className="text-lg font-semibold">+12%</span>
            </div>
          </div>
        </Card>
        <Card title="Total Expenses" height={100} width={300}>
          <div className="flex items-center gap-2 relative h-full">
            <Image src="/money.svg" alt="money" width={30} height={30} />
            <h1 className="text-2xl font-bold">P22,400.00</h1>
            <div className="absolute bottom-3 right-1 flex gap-1">
              <Image src="/arrow.svg" alt="arrow" width={16} height={16} />
              <span className="text-lg font-semibold">+12%</span>
            </div>
          </div>
        </Card>
        <Card title="Maintainance Orders" height={100} width={275}>
          <div className="flex items-center gap-2 relative h-full">
            <Image src="/setting.svg" alt="setting" width={24} height={24} />
            <h1 className="text-3xl font-bold">9</h1>
          </div>
        </Card>
        <Card title="Active Drivers" height={100} width={275}>
          <div className="flex items-center gap-2 relative h-full">
            <Image src="/package_car.svg" alt="package_car" width={24} height={24} />
            <h1 className="text-3xl font-bold">240</h1>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
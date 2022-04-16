import { memberApplications } from "../../helpers/mockData"

function Members() {
  return (
    <div className="h-full">
        <h1 className='mb-5 mt-2 font-bold uppercase'>Members</h1>
        <div className="flex bg-white p-6 min-h-full">
            <div className="w-full relative overflow-x-auto sm:rounded-lg">
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th className='px-6 py-4'>Date</th><th className='px-6 py-4'>Member's Name</th><th className='px-6 py-4'>ID</th><th className='px-6 py-4'>Amount</th><th className='px-6 py-4'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {memberApplications.map((member, index) => (
                    <tr className={`${index % 2 === 0 ? "bg-gray-50" : ""} hover:bg-gray-100`} key={index}>
                      <td className='px-6 py-3'>{member.date}</td><td className='px-6 py-3'>{member.name}</td><td className='px-6 py-3'>{member.id}</td><td className='px-6 py-3'>{member.amount}</td><td className='px-6 py-3'>{member.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    </div>
  )
}

export default Members
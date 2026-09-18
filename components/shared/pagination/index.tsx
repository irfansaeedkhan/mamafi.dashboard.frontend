import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const items = [
  {
    id: 1,
    title: 'Back End Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
  },
  {
    id: 2,
    title: 'Front End Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
  },
  {
    id: 3,
    title: 'User Interface Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Remote',
  },
];

export const Pagination = () => {
  return (
    <div className="border-gray-200 flex items-center justify-center border-t bg-light px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="border-gray-300 text-gray-700 hover:bg-gray-50 relative inline-flex items-center rounded-md border bg-light px-4 py-2 text-sm font-medium"
        >
          Previous
        </a>
        <a
          href="#"
          className="border-gray-300 text-gray-700 hover:bg-gray-50 relative ml-3 inline-flex items-center rounded-md border bg-light px-4 py-2 text-sm font-medium"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="text-gray-400 ring-gray-300 hover:bg-gray-50 relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <HiChevronLeft className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#"
              aria-current="page"
              className="bg-blue-shade-2 focus-visible:outline-blue-shade-1 relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              1
            </a>
            <a
              href="#"
              className="text-gray-900 ring-gray-300 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="text-gray-900 ring-gray-300 hover:bg-gray-50 relative hidden items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="text-gray-700 ring-gray-300 relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="text-gray-900 ring-gray-300 hover:bg-gray-50 relative hidden items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              8
            </a>
            <a
              href="#"
              className="text-gray-900 ring-gray-300 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0"
            >
              9
            </a>
            <a
              href="#"
              className="text-gray-900 ring-gray-300 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0"
            >
              10
            </a>
            <a
              href="#"
              className="text-gray-400 ring-gray-300 hover:bg-gray-50 relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <HiChevronRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

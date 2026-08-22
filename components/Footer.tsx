import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy/80 backdrop-blur-md text-gray-400 py-8 px-4 flex flex-col items-center">
      <div className="flex space-x-6 mb-4 text-sm">
        {['Privacy','Terms','Contact','Status'].map(item => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-primary transition-colors"
          >
            {item}
          </Link>
        ))}
      </div>
      <p className="text-xs">
        © {new Date().getFullYear()} SafePredict AI. All rights reserved.
      </p>
    </footer>
  );
}

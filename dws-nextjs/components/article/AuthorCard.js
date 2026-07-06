import { urlFor } from "@/lib/sanity/image";

export default function AuthorCard({ author }) {
  if (!author) return null;

  const avatarUrl = author.avatar ? urlFor(author.avatar).width(160).height(160).url() : null;

  return (
    <div className="bg-brand-lightBg border border-blue-100 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 shadow-sm">
      {avatarUrl ? (
        <img src={avatarUrl} alt={author.name} className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md flex-shrink-0" />
      ) : (
        <div className="w-20 h-20 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-xl font-bold uppercase flex-shrink-0">
          {author.name.charAt(0)}
        </div>
      )}
      <div className="space-y-3 flex-1">
        <div>
          <h4 className="text-brand-darkBg font-display font-bold text-lg">{author.name}</h4>
          <p className="text-gray-400 text-xs mt-0.5">Penulis & Kontributor DWS</p>
        </div>
        
        {author.bio && (
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
            {author.bio}
          </p>
        )}

        {/* Social Media Links */}
        {author.social && (
          <div className="flex justify-center sm:justify-start gap-4 pt-2">
            {author.social.twitter && (
              <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-blue transition-colors text-xs font-semibold">
                Twitter
              </a>
            )}
            {author.social.facebook && (
              <a href={author.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-blue transition-colors text-xs font-semibold">
                Facebook
              </a>
            )}
            {author.social.linkedin && (
              <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-blue transition-colors text-xs font-semibold">
                LinkedIn
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { toast } from 'react-hot-toast';

export interface TeamInfo {
  id: string;
  name: string;
  logo: string;
  description: string[];
  location: string;
  teamSize: string;
  funding?: string;
  updates: Array<{
    type: string;
    content: string;
  }>;
  founder: {
    name: string;
    avatar: string;
    socials: string[];
  };
}
interface TeamCardProps {
  team: TeamInfo;
}
const TeamCard: React.FC<TeamCardProps> = ({
  team
}) => {
  return <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 h-[410px]">
    <div className="p-6">
      <div className="flex items-start mb-4">
        <h3 className="text-xl font-bold">{team.name}</h3>
      </div>
      <div className="mt-6 space-y-3 border-t border-gray-100 pt-4">
        <div className="mt-1">
          <p 
            className="text-gray-600 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
            onClick={() => {
              navigator.clipboard.writeText(team.description.join('\n')).then(() => {
                toast.success('复制成功!');
              });
            }}
          >
            {team.description}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 text-sm bg-gray-100 rounded-full">
            {team.location}
          </span>
      </div>
    </div>
  </div>;
};
export default TeamCard;
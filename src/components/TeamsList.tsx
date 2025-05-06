import React, { useEffect, useState } from 'react';
import TeamCard, { TeamInfo } from './TeamCard';

const TeamsList = () => {
  const [teams, setTeams] = useState<TeamInfo[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ghfast.top/https://raw.githubusercontent.com/magang0425/prompt-convert/refs/heads/master/transformed_prompts.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const transformedTeams: TeamInfo[] = data.map((item: any) => ({
          id: String(item.id), // Ensure id is a string
          name: item.title,
          description: [item.content], // Wrap content in an array
          location: item.category,
          logo: '',
          teamSize: 'N/A',
          funding: 'N/A',
          updates: [],
          founder: {
            name: 'N/A',
            avatar: 'https://via.placeholder.com/40',
            socials: []
          }
        }));
        setTeams(transformedTeams);
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(transformedTeams.map(team => team.location)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch teams data:", error);
        // Optionally, set teams to an empty array or display an error message
        setTeams([]);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Filter teams based on selected category and search term
  const filteredTeams = teams.filter(team => {
    // Category filter
    const matchesCategory = selectedCategory ? team.location === selectedCategory : true;
    
    // Search term filter (case-insensitive search in name and description)
    const matchesSearch = searchTerm.trim() === '' ? true : 
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      team.description.some(desc => desc.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Item passes filter if it matches both category and search criteria
    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      // If clicking the same category, clear the filter
      setSelectedCategory(null);
    } else {
      // Otherwise, set the new filter
      setSelectedCategory(category);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSearchTerm('');
  };

  if (teams.length === 0) {
    // Optional: render a loading state or a message if teams haven't loaded
    return <div>Loading teams...</div>;
  }

  return (
    <div className="w-full py-8">
      {/* Search and filter container */}
      <div className="mb-6 space-y-4">
        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="搜索标题或描述..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Show reset button if any filter is active */}
        {(selectedCategory || searchTerm) && (
          <div className="flex justify-end">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-all flex items-center"
            >
              <svg 
                className="mr-1" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 6L5 20M5 6L19 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              重新筛选
            </button>
          </div>
        )}
      </div>

      {/* Results summary */}
      <div className="mb-4">
        <p className="text-gray-600">
          {filteredTeams.length} 个结果 {selectedCategory && `在 "${selectedCategory}" 分类中`} {searchTerm && `包含 "${searchTerm}"`}
        </p>
      </div>

      {/* Teams grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.length > 0 ? (
          filteredTeams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500">没有找到匹配的结果</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsList;
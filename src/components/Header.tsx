import React from 'react';

const Header = () => {
    return <header
        className="w-full py-4 px-4 md:px-8 lg:px-16 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <div className="flex items-center">
                <span className="text-purple-600 text-2xl font-bold">👋</span>
                <span className="ml-2 font-bold text-xl">PromptHub</span>
            </div>
        </div>
        <div className="flex items-center space-x-3">
            <a target='_blank' href='https://bp.upsui.com'>
                <button className="px-3 py-2 text-blue-600 flex items-center rounded-md">
                    <span className="mr-1">👍</span> prompt 优化
                </button>
            </a>
            <a target='_blank' href='https://wfvhqxslfk.feishu.cn/docx/T761dJpKsotPo9xxBtKcRfxunMb'>
                <button className="px-3 py-2 text-blue-600 flex items-center rounded-md">
                    <span className="mr-1">👉️</span> prompt 管理工具
                </button>
            </a>
            <a target='_blank' href='https://wfvhqxslfk.feishu.cn/share/base/form/shrcngNDAOQtQsHijoMDqR1jcbb'>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    提交 prompt
                </button>
            </a>
        </div>
    </header>;
};
export default Header;
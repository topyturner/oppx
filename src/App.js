import React, { useState, useEffect, useRef } from 'react';
import { Send, Home, MessageCircle, Bell, User, Users, Image, Video, Smile, ThumbsUp, MessageSquare, Share2, Settings, Search, Plus, X, Heart, Bookmark, TrendingUp, Globe } from 'lucide-react';

const OperationX = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: { name: 'Sarah Johnson', avatar: '👩‍💼', verified: true },
      content: 'Just launched my new project! Excited to share this journey with everyone. 🚀',
      image: null,
      timestamp: '2 hours ago',
      likes: 124,
      comments: 23,
      shares: 5,
      liked: false,
      bookmarked: false
    },
    {
      id: 2,
      author: { name: 'Mike Chen', avatar: '👨‍💻', verified: false },
      content: 'Amazing sunset view from my office today! Nature is incredible.',
      image: '🌅',
      timestamp: '5 hours ago',
      likes: 89,
      comments: 12,
      shares: 3,
      liked: true,
      bookmarked: false
    }
  ]);
  
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Emma Wilson',
      avatar: '👩‍🎨',
      lastMessage: 'See you tomorrow!',
      timestamp: '10m ago',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'David Brown',
      avatar: '👨‍🔬',
      lastMessage: 'Thanks for the help!',
      timestamp: '1h ago',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Lisa Anderson',
      avatar: '👩‍🏫',
      lastMessage: 'Did you check the document?',
      timestamp: '3h ago',
      unread: 1,
      online: true
    }
  ]);

  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({
    1: [
      { id: 1, text: 'Hey! How are you?', sender: 'them', timestamp: '10:30 AM' },
      { id: 2, text: 'I\'m good! Working on the new project.', sender: 'me', timestamp: '10:32 AM' },
      { id: 3, text: 'That sounds exciting! Need any help?', sender: 'them', timestamp: '10:33 AM' },
      { id: 4, text: 'See you tomorrow!', sender: 'them', timestamp: '10:35 AM' }
    ],
    2: [
      { id: 1, text: 'Can you help me with the code?', sender: 'them', timestamp: '9:00 AM' },
      { id: 2, text: 'Sure! What do you need?', sender: 'me', timestamp: '9:05 AM' },
      { id: 3, text: 'Thanks for the help!', sender: 'them', timestamp: '9:45 AM' }
    ],
    3: [
      { id: 1, text: 'Did you check the document?', sender: 'them', timestamp: '8:00 AM' }
    ]
  });

  const [newMessage, setNewMessage] = useState('');
  const [newPost, setNewPost] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'like', user: 'Alex Turner', content: 'liked your post', timestamp: '5m ago', read: false },
    { id: 2, type: 'comment', user: 'Jessica Lee', content: 'commented on your post', timestamp: '15m ago', read: false },
    { id: 3, type: 'friend', user: 'Tom Harris', content: 'sent you a friend request', timestamp: '1h ago', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeChat) scrollToBottom();
  }, [activeChat, messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && activeChat) {
      const newMsg = {
        id: messages[activeChat].length + 1,
        text: newMessage,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages({ ...messages, [activeChat]: [...messages[activeChat], newMsg] });
      setNewMessage('');
      
      const updatedConvs = conversations.map(c => 
        c.id === activeChat ? { ...c, lastMessage: newMessage, timestamp: 'Just now' } : c
      );
      setConversations(updatedConvs);
    }
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: { name: 'You', avatar: '😊', verified: true },
        content: newPost,
        image: null,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        bookmarked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowCreatePost(false);
    }
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(p => 
      p.id === postId 
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  };

  const handleBookmarkPost = (postId) => {
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, bookmarked: !p.bookmarked } : p
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              OperationX
            </h1>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search OperationX..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setActiveTab('home')}
              className={`p-2 rounded-lg transition-colors ${activeTab === 'home' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Home className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`p-2 rounded-lg transition-colors ${activeTab === 'messages' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`p-2 rounded-lg transition-colors ${activeTab === 'friends' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Users className="w-6 h-6" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-lg">Notifications</h3>
                  </div>
                  {notifications.map(notif => (
                    <div key={notif.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {notif.user[0]}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-semibold">{notif.user}</span> {notif.content}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{notif.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setActiveTab('profile')}
              className={`p-2 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto p-4 h-full overflow-y-auto">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl">
                  😊
                </div>
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="flex-1 text-left px-4 py-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  What's on your mind?
                </button>
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-200">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium">Live Video</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Image className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Photo</span>
                </button>
              </div>
            </div>

            {/* Create Post Modal */}
            {showCreatePost && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-lg w-full">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-lg">Create Post</h3>
                    <button onClick={() => setShowCreatePost(false)} className="text-gray-500 hover:text-gray-700">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="p-4">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="What's on your mind?"
                      className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <button
                      onClick={handleCreatePost}
                      disabled={!newPost.trim()}
                      className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Stories */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex gap-3 overflow-x-auto pb-2">
                <div className="flex-shrink-0 w-28">
                  <div className="relative">
                    <div className="w-28 h-44 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white text-4xl cursor-pointer hover:opacity-90 transition-opacity">
                      <Plus className="w-8 h-8" />
                    </div>
                    <p className="text-xs font-medium mt-2 text-center">Create Story</p>
                  </div>
                </div>
                {['🎨', '🎮', '📸', '🎵', '✈️'].map((emoji, idx) => (
                  <div key={idx} className="flex-shrink-0 w-28">
                    <div className="w-28 h-44 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-lg flex items-center justify-center text-white text-4xl cursor-pointer hover:opacity-90 transition-opacity relative">
                      {emoji}
                      <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-blue-600 border-2 border-white"></div>
                    </div>
                    <p className="text-xs font-medium mt-2 text-center truncate">User {idx + 1}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl">
                          {post.author.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-sm">{post.author.name}</h4>
                            {post.author.verified && (
                              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            {post.timestamp} • <Globe className="w-3 h-3" />
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Settings className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-gray-800 mb-3">{post.content}</p>
                    {post.image && (
                      <div className="mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-yellow-300 to-orange-400 h-64 flex items-center justify-center text-6xl">
                        {post.image}
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500 border-t border-b border-gray-100">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4 text-blue-500 fill-blue-500" />
                      {post.likes}
                    </span>
                    <div className="flex items-center gap-3">
                      <span>{post.comments} comments</span>
                      <span>{post.shares} shares</span>
                    </div>
                  </div>
                  <div className="p-2 flex items-center justify-around">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${post.liked ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <ThumbsUp className={`w-5 h-5 ${post.liked ? 'fill-blue-600' : ''}`} />
                      <span className="font-medium">Like</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MessageSquare className="w-5 h-5" />
                      <span className="font-medium">Comment</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="font-medium">Share</span>
                    </button>
                    <button
                      onClick={() => handleBookmarkPost(post.id)}
                      className={`p-2 rounded-lg transition-colors ${post.bookmarked ? 'text-yellow-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <Bookmark className={`w-5 h-5 ${post.bookmarked ? 'fill-yellow-600' : ''}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Messages</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.map(conv => (
                  <div
                    key={conv.id}
                    onClick={() => setActiveChat(conv.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${activeChat === conv.id ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl">
                          {conv.avatar}
                        </div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm truncate">{conv.name}</h3>
                          <span className="text-xs text-gray-500">{conv.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conv.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
              {activeChat ? (
                <>
                  <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl">
                        {conversations.find(c => c.id === activeChat)?.avatar}
                      </div>
                      {conversations.find(c => c.id === activeChat)?.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{conversations.find(c => c.id === activeChat)?.name}</h3>
                      <p className="text-xs text-gray-500">
                        {conversations.find(c => c.id === activeChat)?.online ? 'Active now' : 'Offline'}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages[activeChat]?.map(msg => (
                      <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs ${msg.sender === 'me' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'} rounded-2xl px-4 py-2 shadow-sm`}>
                          <p className="text-sm">{msg.text}</p>
                          <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-200' : 'text-gray-500'}`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                        <Plus className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                        <Image className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                        <Smile className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="max-w-4xl mx-auto p-4 h-full overflow-y-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
              <h2 className="text-xl font-semibold mb-4">Friend Requests</h2>
              <div className="space-y-4">
                {['Alex Turner', 'Sam Rodriguez', 'Taylor Kim'].map((name, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-semibold text-lg">
                        {name[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold">{name}</h3>
                        <p className="text-sm text-gray-500">2 mutual friends</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Confirm
                      </button>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Suggested Friends</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Jordan Lee', 'Morgan Blake', 'Casey Parker', 'Riley Cooper'].map((name, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                        {name[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold">{name}</h3>
                        <p className="text-sm text-gray-500">{Math.floor(Math.random() * 10) + 1} mutual friends</p>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Add Friend
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto p-4 h-full overflow-y-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              {/* Cover Photo */}
              <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              
              {/* Profile Info */}
              <div className="px-6 pb-6">
                <div className="flex items-end justify-between -mt-16 mb-4">
                  <div className="flex items-end gap-4">
                    <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-5xl shadow-lg">
                      😊
                    </div>
                    <div className="mb-2">
                      <h2 className="text-2xl font-bold">Your Name</h2>
                      <p className="text-gray-600">500 friends</p>
                    </div>
                  </div>
                  <button className="mb-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Edit Profile
                  </button>
                </div>

                {/* Profile Stats */}
                <div className="grid grid-cols-4 gap-4 py-4 border-t border-b border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">256</p>
                    <p className="text-sm text-gray-600">Posts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">500</p>
                    <p className="text-sm text-gray-600">Friends</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-pink-600">1.2K</p>
                    <p className="text-sm text-gray-600">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">89</p>
                    <p className="text-sm text-gray-600">Following</p>
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-gray-700">Digital creator | Tech enthusiast | Coffee lover ☕</p>
                  <p className="text-gray-700 mt-2">📍 San Francisco, CA</p>
                  <p className="text-gray-700">🎂 Joined January 2020</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'Posted a new photo', time: '2 hours ago', icon: '📸' },
                  { action: 'Liked a post by Sarah Johnson', time: '5 hours ago', icon: '❤️' },
                  { action: 'Commented on Mike Chen\'s post', time: '1 day ago', icon: '💬' },
                  { action: 'Updated profile picture', time: '3 days ago', icon: '🖼️' }
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-3xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OperationX;

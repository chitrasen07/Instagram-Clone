import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate, useParams } from 'react-router-dom';
import { Home, Search, PlusSquare, Heart, User, LogIn, Facebook, Film, Send, Bookmark, Settings, Repeat, Sun, Moon, LogOut, ImagePlus, X } from 'lucide-react';
// import axios from 'axios'; // Uncomment when ready to make API calls
import './App.css';

// --- Context for Authentication and Theme ---
const AuthContext = createContext(null);
const ThemeContext = createContext(null);

// --- Mock Data (Replace with API calls) ---
// Keep mock data for initial UI rendering until API is connected
const mockUser = {
  _id: 'user123', // Example ID from MongoDB
  username: 'sample_user',
  fullName: 'Sample User',
  profilePic: 'https://placehold.co/150x150/EFEFEF/grey?text=User',
  bio: 'This is a sample bio.',
  posts: [], // Posts would be fetched separately
  followers: [],
  following: [],
};

const mockPosts = [
  { _id: 'post1', user: { _id: 'user456', username: 'another_user', profilePic: 'https://placehold.co/32x32/EFEFEF/grey?text=AU'}, imageUrl: 'https://placehold.co/600x600/cccccc/grey?text=Post+1', caption: 'Beautiful scenery!', likes: ['user123'], comments: [{ _id: 'comment1', user: { _id: 'user123', username: 'sample_user'}, text: 'Nice shot!', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) }], createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { _id: 'post2', user: { _id: 'user789', username: 'test_account', profilePic: 'https://placehold.co/32x32/EFEFEF/grey?text=TA'}, imageUrl: 'https://placehold.co/600x600/dddddd/grey?text=Post+2', caption: 'Exploring the city.', likes: [], comments: [], createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  { _id: 'post3', user: { _id: 'userABC', username: 'insta_lover', profilePic: 'https://placehold.co/32x32/EFEFEF/grey?text=IL'}, imageUrl: 'https://placehold.co/600x600/eeeeee/grey?text=Post+3', caption: 'Foodie adventures! 🍕', likes: ['user456', 'user789'], comments: [{ _id: 'comment2', user: { _id: 'user456', username: 'another_user'}, text: 'Looks delicious!'}, { _id: 'comment3', user: { _id: 'user123', username: 'sample_user'}, text: 'Yum!'}], createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
];

// --- API Base URL (Configure in .env ideally) ---
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // Example

// --- Helper Hooks ---
function useAuth() {
  return useContext(AuthContext);
}

function useTheme() {
  return useContext(ThemeContext);
}

// --- Utility Functions ---
function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return Math.floor(seconds) + "s";
}

// --- Reusable UI Components ---
function Input({ id, type, placeholder, className = '', ...props }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${className}`}
      {...props}
    />
  );
}

function Button({ children, variant = 'primary', className = '', type = 'button', ...props }) {
  const baseStyle = 'w-full py-2 px-4 rounded-md font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-opacity duration-200';
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 disabled:opacity-50',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 dark:focus:ring-gray-500 disabled:opacity-50',
    ghost: 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50',
    link: 'bg-transparent text-blue-500 hover:underline dark:text-blue-400 p-0 h-auto focus:ring-0 focus:ring-offset-0 disabled:opacity-50',
  };
  return (
    <button type={type} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

// --- Page Components ---

// Login Screen
function LoginScreen() {
  const [identifier, setIdentifier] = useState(''); // Can be username or email
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      // --- Backend Integration Point ---
      // const response = await axios.post(`${API_URL}/auth/login`, { identifier, password });
      // const { token, user } = response.data;
      // login(token, user); // Update context with token and user data
      // navigate('/'); // Navigate to feed on successful login

      // Mock Implementation:
      console.log('Attempting login with:', identifier, password);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      if (identifier === 'test' && password === 'password') {
          const mockToken = 'mock-jwt-token';
          login(mockToken, mockUser); // Use mock data
          navigate('/');
      } else {
          throw new Error('Invalid credentials');
      }

    } catch (err) {
      console.error("Login failed:", err);
      // setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
       setError('Login failed. Please check your credentials.'); // Mock error
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="flex flex-col md:flex-row max-w-4xl w-full">
        {/* Image Section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
           <img
             src="https://media.gcflearnfree.org/content/633d944b3823fb02e84dce55_10_05_2022/Screen%20Shot%202022-10-10%20at%202.28.19%20PM.png"
             alt="Instagram preview"
             className="max-w-full h-auto rounded-lg shadow-md object-contain"
             onError={(e) => e.target.src='https://placehold.co/400x600/cccccc/grey?text=Image+Error'}
           />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center space-y-4">
          <div className="w-full max-w-sm p-8 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-4xl font-semibold text-center mb-6 font-[cursive] dark:text-white">Instagram</h1>
             {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-3">
              <Input
                id="identifier"
                type="text"
                placeholder="Username or email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                aria-label="Username or Email"
              />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
              />
              <Button type="submit" disabled={isLoading || !identifier || !password}>
                {isLoading ? 'Logging in...' : 'Log in'}
              </Button>
            </form>
            {/* OR Separator and Social Login */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              <span className="mx-4 text-xs font-semibold text-gray-500 dark:text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <Button variant="ghost" className="w-full flex items-center justify-center space-x-2 text-sm font-semibold !text-[#385185] dark:!text-blue-400">
              <Facebook size={20} className="text-[#1877F2]" />
              <span>Log in with Facebook</span>
            </Button>
             <Link to="/forgot-password" // Add route later if needed
                className="block text-center text-xs text-[#00376B] dark:text-blue-400 hover:underline mt-4">
              Forgot password?
            </Link>
          </div>

          {/* Signup Link */}
          <div className="w-full max-w-sm p-4 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 text-center">
            <p className="text-sm dark:text-gray-300">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-blue-500 hover:underline dark:text-blue-400">
                Sign up
              </Link>
            </p>
          </div>

          {/* Get the App */}
          <div className="text-center text-sm dark:text-gray-300">
            Get the app.
            <div className="flex justify-center space-x-2 mt-3">
              <a href="#" aria-label="Get it on Google Play"><img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="Get it on Google Play" className="h-10" /></a>
              <a href="#" aria-label="Get it from Microsoft"><img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="Get it from Microsoft" className="h-10" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Signup Screen
function SignupScreen() {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth(); // Use login context after successful signup
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            // --- Backend Integration Point ---
            // const response = await axios.post(`${API_URL}/auth/signup`, { email, fullName, username, password });
            // const { token, user } = response.data;
            // login(token, user); // Log the user in immediately after signup
            // navigate('/'); // Navigate to feed

            // Mock Implementation:
            console.log('Attempting signup:', { email, fullName, username, password });
            await new Promise(resolve => setTimeout(resolve, 1500));
             const mockToken = 'mock-jwt-token-signup';
             const newUser = { ...mockUser, _id: 'newUser' + Date.now(), email, fullName, username };
             login(mockToken, newUser);
             navigate('/');

        } catch (err) {
             console.error("Signup failed:", err);
            // setError(err.response?.data?.message || 'Signup failed. Please try again.');
            setError('Signup failed. Username or email might be taken.'); // Mock error
        } finally {
            setIsLoading(false);
        }
    };

    return (
         <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <div className="w-full max-w-sm space-y-4">
                 <div className="p-8 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
                    <h1 className="text-4xl font-semibold text-center mb-4 font-[cursive] dark:text-white">Instagram</h1>
                    <p className="text-center text-gray-500 font-semibold mb-6 dark:text-gray-400 text-base">
                        Sign up to see photos and videos from your friends.
                    </p>
                     {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                    {/* Optional: Social Signup */}
                     <Button variant="primary" className="w-full flex items-center justify-center space-x-2 text-sm font-semibold mb-4 !bg-[#0095F6]">
                      <Facebook size={18} />
                      <span>Log in with Facebook</span>
                    </Button>

                    <div className="flex items-center my-4">
                      <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                      <span className="mx-4 text-xs font-semibold text-gray-500 dark:text-gray-400">OR</span>
                      <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    </div>

                    {/* Signup Form */}
                    <form onSubmit={handleSignup} className="space-y-3">
                        <Input id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Email"/>
                        <Input id="fullName" type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required aria-label="Full Name"/>
                        <Input id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required aria-label="Username"/>
                        <Input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required aria-label="Password"/>
                        {/* Terms and Policy Links */}
                         <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            People who use our service may have uploaded your contact information to Instagram. <a href="#" className="text-[#00376B] dark:text-blue-400">Learn More</a>
                        </p>
                         <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            By signing up, you agree to our <a href="#" className="text-[#00376B] dark:text-blue-400">Terms</a>, <a href="#" className="text-[#00376B] dark:text-blue-400">Privacy Policy</a> and <a href="#" className="text-[#00376B] dark:text-blue-400">Cookies Policy</a>.
                        </p>
                        <Button type="submit" disabled={isLoading || !email || !fullName || !username || !password}>
                            {isLoading ? 'Signing up...' : 'Sign up'}
                        </Button>
                    </form>
                </div>
                {/* Login Link */}
                <div className="w-full p-4 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 text-center">
                    <p className="text-sm dark:text-gray-300">
                        Have an account?{' '}
                        <Link to="/login" className="font-semibold text-blue-500 hover:underline dark:text-blue-400">
                            Log in
                        </Link>
                    </p>
                </div>
                {/* Get the App */}
                <div className="text-center text-sm dark:text-gray-300">
                    Get the app.
                    <div className="flex justify-center space-x-2 mt-3">
                        <a href="#" aria-label="Get it on Google Play"><img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="Get it on Google Play" className="h-10" /></a>
                        <a href="#" aria-label="Get it from Microsoft"><img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="Get it from Microsoft" className="h-10" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Post Component
function Post({ post }) {
  const { user: currentUser, token } = useAuth(); // Get current logged-in user
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser?._id));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments); // Local state for comments
  const [showAllComments, setShowAllComments] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  // Update like status if post or user changes
  useEffect(() => {
      setIsLiked(post.likes.includes(currentUser?._id));
      setLikeCount(post.likes.length);
      setComments(post.comments);
  }, [post, currentUser]);

  const handleLikeToggle = async () => {
    if (!currentUser) return; // Must be logged in

    const originalLiked = isLiked;
    const originalCount = likeCount;

    // Optimistic UI update
    setIsLiked(!originalLiked);
    setLikeCount(originalLiked ? originalCount - 1 : originalCount + 1);

    try {
      // --- Backend Integration Point ---
      // const config = { headers: { Authorization: `Bearer ${token}` } };
      // await axios.put(`${API_URL}/posts/${post._id}/like`, {}, config);
      console.log(`Toggled like for post ${post._id}`);
      // No need to update state again if API call is successful
    } catch (err) {
      console.error("Failed to toggle like:", err);
      // Revert UI changes if API call fails
      setIsLiked(originalLiked);
      setLikeCount(originalCount);
      // Show error message to user
    }
  };

  const handleCommentSubmit = async (e) => {
      e.preventDefault();
      if (!comment.trim() || !currentUser || isCommenting) return;

      setIsCommenting(true);
      const tempComment = { // Temporary comment for optimistic update
          _id: 'temp-' + Date.now(),
          user: { _id: currentUser._id, username: currentUser.username },
          text: comment,
          createdAt: new Date()
      };

      // Optimistic UI update
      setComments([...comments, tempComment]);
      const oldCommentInput = comment;
      setComment('');


      try {
          // --- Backend Integration Point ---
          // const config = { headers: { Authorization: `Bearer ${token}` } };
          // const response = await axios.post(`${API_URL}/posts/${post._id}/comment`, { text: oldCommentInput }, config);
          // const newCommentFromServer = response.data;

          // Replace temporary comment with actual comment from server
          // setComments(prevComments => prevComments.map(c => c._id === tempComment._id ? newCommentFromServer : c));
          console.log(`Posted comment: ${oldCommentInput} to post ${post._id}`);
          // Mock: Assume success, keep the temp comment for now in mock mode
      } catch (err) {
          console.error("Failed to post comment:", err);
          // Revert UI changes
          setComments(prevComments => prevComments.filter(c => c._id !== tempComment._id));
          setComment(oldCommentInput); // Restore input
          // Show error message
      } finally {
          setIsCommenting(false);
      }
  };

  const displayedComments = showAllComments ? comments : comments.slice(-2); // Show last 2 or all

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 sm:mb-6 overflow-hidden max-w-xl mx-auto">
      {/* Post Header */}
      <div className="flex items-center p-3">
        <Link to={`/${post.user.username}`} className="flex items-center">
            <img
                src={post.user.profilePic || 'https://placehold.co/32x32/EFEFEF/grey?text=U'}
                alt={`${post.user.username}'s profile`}
                className="w-8 h-8 rounded-full mr-3 object-cover"
                onError={(e) => e.target.src='https://placehold.co/32x32/cccccc/grey?text=Err'}
            />
            <span className="font-semibold text-sm dark:text-white hover:underline">{post.user.username}</span>
        </Link>
        {/* Add options button (...) here */}
      </div>

      {/* Post Image */}
      <img
        src={post.imageUrl}
        alt={`Post by ${post.user.username}`}
        className="w-full h-auto object-cover border-y border-gray-200 dark:border-gray-700"
        onError={(e) => e.target.src='https://placehold.co/600x600/cccccc/grey?text=Image+Error'}
      />

      {/* Post Actions */}
      <div className="flex justify-between items-center p-3">
        <div className="flex space-x-4">
          <button onClick={handleLikeToggle} className="transform transition-transform duration-150 ease-out active:scale-125 disabled:opacity-50" disabled={!currentUser}>
            <Heart size={24} className={` ${isLiked ? 'fill-red-500 text-red-500' : 'text-black dark:text-white'}`} />
          </button>
          <label htmlFor={`comment-input-${post._id}`} className="cursor-pointer"> {/* Focus input on click */}
            <svg aria-label="Comment" className="text-black dark:text-white" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
          </label>
          <button className="disabled:opacity-50" disabled={!currentUser}><Send size={24} className="text-black dark:text-white transform -rotate-12" /></button>
        </div>
        <div>
          <button className="disabled:opacity-50" disabled={!currentUser}><Bookmark size={24} className="text-black dark:text-white" /></button>
        </div>
      </div>

      {/* Likes Count */}
      <div className="px-3 pb-1">
        <span className="font-semibold text-sm dark:text-white">{likeCount} likes</span>
      </div>

      {/* Caption */}
      <div className="px-3 pb-2 text-sm dark:text-white">
        <Link to={`/${post.user.username}`} className="font-semibold mr-1 hover:underline">{post.user.username}</Link>
        {post.caption}
      </div>

       {/* Comments Section */}
      <div className="px-3 pb-2 text-sm text-gray-500 dark:text-gray-400">
        {comments.length > 2 && !showAllComments && (
            <button onClick={() => setShowAllComments(true)} className="mb-1 cursor-pointer hover:underline">
                View all {comments.length} comments
            </button>
        )}
        { displayedComments.map((c) => (
            <div key={c._id} className="mb-0.5">
                <Link to={`/${c.user.username}`} className="font-semibold text-black dark:text-white mr-1 hover:underline">{c.user.username}</Link>
                <span className="dark:text-gray-300">{c.text}</span>
            </div>
        ))}
         <span className="text-xs uppercase text-gray-400 dark:text-gray-500 mt-1 block">{timeAgo(post.createdAt)}</span>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleCommentSubmit} className="border-t border-gray-200 dark:border-gray-700 p-3 flex items-center">
        {/* Optional: Emoji Button */}
         <input
            id={`comment-input-${post._id}`} // For label focusing
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-grow bg-transparent outline-none text-sm dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            aria-label="Add a comment"
            disabled={!currentUser || isCommenting}
        />
        <Button variant="link" type="submit" className="!w-auto !p-0 !font-semibold !text-sm" disabled={!comment.trim() || !currentUser || isCommenting}>
            {isCommenting ? 'Posting...' : 'Post'}
        </Button>
      </form>
    </div>
  );
}

// Header Component
function Header() {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For potential dropdown

  if (!user) return null; // Don't render header if not logged in

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 shadow-sm">
      <nav className="max-w-5xl mx-auto px-4 py-2 h-14 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold font-[cursive] dark:text-white flex-shrink-0">
          Instagram
        </Link>

        {/* Search Bar (Visible on larger screens) */}
        <div className="hidden sm:block relative w-full max-w-xs mx-4">
           <Input type="text" placeholder="Search" className="pl-10 !py-1.5 bg-gray-100 dark:bg-gray-700 border-none rounded-lg" aria-label="Search"/>
           <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4 md:space-x-5 flex-shrink-0">
          <Link to="/" aria-label="Home Feed" className="text-black dark:text-white"><Home size={24} /></Link>
          <Link to="/create" aria-label="Create Post" className="text-black dark:text-white"><PlusSquare size={24} /></Link>
          <Link to="/notifications" aria-label="Notifications" className="text-black dark:text-white"><Heart size={24} /></Link>
          <button onClick={toggleTheme} aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`} className="text-black dark:text-white">
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          {/* Profile Dropdown/Link */}
          <div className="relative">
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Profile options">
                <img
                    src={user.profilePic || 'https://placehold.co/24x24/EFEFEF/grey?text=P'}
                    alt="Your profile"
                    className="w-6 h-6 rounded-full object-cover"
                    onError={(e) => e.target.src='https://placehold.co/24x24/cccccc/grey?text=P'}
                />
             </button>
             {/* Dropdown Menu (Example) */}
             {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-600 z-40">
                    <Link to={`/${user.username}`} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => setIsMenuOpen(false)}>
                        <User size={16} className="inline mr-2"/> Profile
                    </Link>
                     <Link to="/saved" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => setIsMenuOpen(false)}>
                        <Bookmark size={16} className="inline mr-2"/> Saved
                    </Link>
                     <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => setIsMenuOpen(false)}>
                        <Settings size={16} className="inline mr-2"/> Settings
                    </Link>
                    <button onClick={toggleTheme} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                         {isDarkMode ? <Sun size={16} className="inline mr-2"/> : <Moon size={16} className="inline mr-2" />} Switch Appearance
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <LogOut size={16} className="inline mr-2"/> Log Out
                    </button>
                </div>
             )}
          </div>
        </div>
      </nav>
    </header>
  );
}

// Feed Screen
function FeedScreen() {
  const [posts, setPosts] = useState(mockPosts); // Start with mock, fetch real data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchFeed = async () => {
      setIsLoading(true);
      setError('');
      try {
        // --- Backend Integration Point ---
        // const config = { headers: { Authorization: `Bearer ${token}` } };
        // const response = await axios.get(`${API_URL}/posts/feed`, config);
        // setPosts(response.data);

        console.log("Fetching feed..."); // Mock
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate fetch time
        setPosts(mockPosts); // Use mock data for now

      } catch (err) {
        console.error("Failed to fetch feed:", err);
        // setError(err.response?.data?.message || 'Could not load feed.');
        setError('Could not load feed.'); // Mock error
        setPosts([]); // Clear posts on error
      } finally {
        setIsLoading(false);
      }
    };

    if (token) { // Only fetch if logged in (token exists)
        // fetchFeed(); // Uncomment when API is ready
    } else {
        setPosts([]); // Clear posts if logged out
    }
  }, [token]); // Refetch when token changes (login/logout)

  return (
    <div className="max-w-xl mx-auto py-4 px-2 md:px-0">
      {/* Add Stories section placeholder here */}
      {isLoading && <p className="text-center dark:text-gray-400">Loading feed...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!isLoading && !error && posts.length === 0 && <p className="text-center dark:text-gray-400">No posts to show. Follow some users!</p>}
      {!isLoading && !error && posts.map(post => <Post key={post._id} post={post} />)}
      {/* Add loading indicator or end-of-feed message here */}
    </div>
  );
}

// Profile Screen
function ProfileScreen() {
    const { username } = useParams(); // Get username from URL
    const { user: currentUser, token } = useAuth();
    const [profileUser, setProfileUser] = useState(null); // User whose profile is being viewed
    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isFollowing, setIsFollowing] = useState(false); // Track follow status
    const [followLoading, setFollowLoading] = useState(false);

    const isOwnProfile = currentUser?.username === username;

    useEffect(() => {
        const fetchProfileData = async () => {
            setIsLoading(true);
            setError('');
            try {
                // --- Backend Integration Point ---
                // Fetch profile details
                // const profileRes = await axios.get(`${API_URL}/users/profile/${username}`);
                // setProfileUser(profileRes.data);

                // Fetch user's posts
                // const postsRes = await axios.get(`${API_URL}/posts/user/${username}`);
                // setUserPosts(postsRes.data);

                // Check follow status if not own profile and logged in
                // if (!isOwnProfile && currentUser) {
                //    const followStatusRes = await axios.get(`${API_URL}/users/isfollowing/${profileRes.data._id}`, { headers: { Authorization: `Bearer ${token}` } });
                //    setIsFollowing(followStatusRes.data.isFollowing);
                // }

                // Mock Implementation:
                console.log(`Fetching profile for ${username}...`);
                await new Promise(resolve => setTimeout(resolve, 700));
                if (username === mockUser.username) {
                    setProfileUser(mockUser);
                    setUserPosts(mockPosts.filter(p => p.user.username === mockUser.username)); // Filter mock posts
                    // Assume not following self
                } else {
                     // Find a mock user or create one
                     const foundUser = mockPosts.find(p => p.user.username === username)?.user;
                     if (foundUser) {
                         setProfileUser({ ...foundUser, bio: 'Another user bio', followers: [], following: [], posts: []}); // Add mock details
                         setUserPosts(mockPosts.filter(p => p.user.username === username));
                         // Mock follow status (e.g., assume current user follows 'another_user')
                         setIsFollowing(username === 'another_user');
                     } else {
                         throw new Error('User not found');
                     }
                }

            } catch (err) {
                console.error("Failed to fetch profile:", err);
                // setError(err.response?.data?.message || 'Could not load profile.');
                setError('User not found or failed to load profile.'); // Mock error
                setProfileUser(null);
                setUserPosts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfileData();
    }, [username, currentUser, isOwnProfile, token]); // Re-fetch if username or logged-in user changes

    const handleFollowToggle = async () => {
        if (!currentUser || isOwnProfile || followLoading) return;

        setFollowLoading(true);
        const originalFollowing = isFollowing;
        // Optimistic update
        setIsFollowing(!originalFollowing);
        // Adjust follower count optimistically (optional, depends on data structure)
        // setProfileUser(prev => ({...prev, followers: originalFollowing ? prev.followers -1 : prev.followers + 1 }))


        try {
            // --- Backend Integration Point ---
            // const config = { headers: { Authorization: `Bearer ${token}` } };
            // const action = originalFollowing ? 'unfollow' : 'follow';
            // await axios.put(`${API_URL}/users/${profileUser._id}/${action}`, {}, config);
            console.log(`${originalFollowing ? 'Unfollowed' : 'Followed'} user ${profileUser.username}`);
            // Fetch updated profile data or trust optimistic update

        } catch (err) {
            console.error("Follow/Unfollow failed:", err);
             // Revert UI
             setIsFollowing(originalFollowing);
             // setProfileUser(prev => ({...prev, followers: originalFollowing ? prev.followers + 1 : prev.followers - 1 })) // Revert count
             setError('Could not update follow status.');
        } finally {
            setFollowLoading(false);
        }
    };


    if (isLoading) return <p className="text-center mt-10 dark:text-gray-400">Loading profile...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!profileUser) return <p className="text-center mt-10 dark:text-gray-400">Profile not found.</p>;


    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
                <img
                    src={profileUser.profilePic || 'https://placehold.co/150x150/EFEFEF/grey?text=U'}
                    alt={`${profileUser.username}'s profile`}
                    className="w-24 h-24 sm:w-36 sm:h-36 rounded-full mr-0 sm:mr-10 mb-4 sm:mb-0 flex-shrink-0 object-cover border dark:border-gray-600"
                    onError={(e) => e.target.src='https://placehold.co/150x150/cccccc/grey?text=Error'}
                />
                <div className="flex-grow text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start space-x-4 mb-4">
                        <h2 className="text-2xl font-light dark:text-white">{profileUser.username}</h2>
                        {/* Action Buttons */}
                        {isOwnProfile ? (
                            <>
                                <Button variant="secondary" className="!w-auto !py-1 !px-3 !text-sm !font-semibold">Edit Profile</Button>
                                <button><Settings size={20} className="dark:text-white"/></button>
                            </>
                        ) : (
                             <Button
                                variant={isFollowing ? 'secondary' : 'primary'}
                                onClick={handleFollowToggle}
                                disabled={followLoading || !currentUser}
                                className="!w-auto !py-1 !px-5 !text-sm !font-semibold">
                                {followLoading ? '...' : (isFollowing ? 'Following' : 'Follow')}
                            </Button>
                        )}

                    </div>
                    {/* Stats */}
                    <div className="flex justify-center sm:justify-start space-x-6 mb-4 text-sm sm:text-base">
                        <span><span className="font-semibold dark:text-white">{userPosts.length}</span> posts</span>
                        {/* Replace with actual counts from backend */}
                        <span><span className="font-semibold dark:text-white">{profileUser.followers?.length || 0}</span> followers</span>
                        <span><span className="font-semibold dark:text-white">{profileUser.following?.length || 0}</span> following</span>
                    </div>
                    {/* Bio */}
                    <div className="dark:text-white text-sm">
                        <p className="font-semibold">{profileUser.fullName || profileUser.username}</p>
                        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{profileUser.bio}</p>
                        {/* Add website link here if available */}
                    </div>
                </div>
            </div>

            {/* Profile Tabs */}
            <div className="border-t border-gray-300 dark:border-gray-700 flex justify-center space-x-10 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                 <button className="flex items-center space-x-1 py-3 border-t-2 border-black dark:border-white text-black dark:text-white">
                    {/* SVG for Posts */}
                    <svg aria-label="Posts" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
                    <span>Posts</span>
                 </button>
                 <button className="flex items-center space-x-1 py-3"><Film size={12}/><span>Reels</span></button>
                 {isOwnProfile && <button className="flex items-center space-x-1 py-3"><Bookmark size={12}/><span>Saved</span></button>}
                 <button className="flex items-center space-x-1 py-3">
                    {/* SVG for Tagged */}
                    <svg aria-label="Tagged" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle></svg>
                    <span>Tagged</span>
                 </button>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-3 gap-1 sm:gap-4">
                {userPosts.length === 0 ? (
                    <div className="col-span-3 text-center py-10">
                        <div className="flex flex-col items-center">
                            <svg aria-label="No Posts Yet" fill="currentColor" height="40" role="img" viewBox="0 0 24 24" width="40" className="text-gray-400 dark:text-gray-500 mb-2"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
                            <h3 className="text-xl font-semibold dark:text-white">No Posts Yet</h3>
                            {isOwnProfile && (
                                <Link to="/create" className="mt-4 text-blue-500 font-semibold">Share your first photo</Link>
                            )}
                        </div>
                    </div>
                ) : (
                    userPosts.map(post => (
                        <Link to={`/p/${post._id}`} key={post._id} className="relative aspect-square block overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <img
                                src={post.imageUrl}
                                alt={`Post by ${profileUser.username}`}
                                className="object-cover w-full h-full"
                                onError={(e) => e.target.src='https://placehold.co/300x300/cccccc/grey?text=Image+Error'}
                            />
                            {/* Hover overlay with likes and comments count */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                                <div className="flex space-x-6 text-white">
                                    <span className="flex items-center"><Heart size={20} fill="white" className="mr-2" />{post.likes.length}</span>
                                    <span className="flex items-center">
                                        <svg aria-label="Comment" fill="white" height="20" role="img" viewBox="0 0 24 24" width="20" className="mr-2"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                        {post.comments.length}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

// Placeholder components for other screens
function CreatePostScreen() {
    return <div className="max-w-xl mx-auto py-8 px-4 text-center dark:text-white">Create Post Screen (To be implemented)</div>;
}

function SearchScreen() {
    return <div className="max-w-xl mx-auto py-8 px-4 text-center dark:text-white">Search Screen (To be implemented)</div>;
}

function NotificationsScreen() {
    return <div className="max-w-xl mx-auto py-8 px-4 text-center dark:text-white">Notifications Screen (To be implemented)</div>;
}

function SavedPostsScreen() {
    return <div className="max-w-xl mx-auto py-8 px-4 text-center dark:text-white">Saved Posts Screen (To be implemented)</div>;
}

function SettingsScreen() {
    return <div className="max-w-xl mx-auto py-8 px-4 text-center dark:text-white">Settings Screen (To be implemented)</div>;
}

function SinglePostScreen() {
    const { postId } = useParams();
    return <div className="max-w-4xl mx-auto py-8 px-4 text-center dark:text-white">Single Post Screen for ID: {postId} (To be implemented)</div>;
}

// Protected Route Component
function ProtectedRoute({ children }) {
    const { token, isAuthLoading } = useAuth();

    if (isAuthLoading) {
        return <div className="flex items-center justify-center min-h-screen dark:bg-gray-900"><p className="dark:text-white">Loading...</p></div>;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

// Main App Component
function App() {
  // Authentication state
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Load user data on mount or when token changes
  useEffect(() => {
    const verifyTokenAndLoadUser = async () => {
      if (!token) {
        setUser(null);
        setIsAuthLoading(false);
        return;
      }

      try {
        // --- Backend Integration Point ---
        // Verify token and get user data
        // const config = { headers: { Authorization: `Bearer ${token}` } };
        // const response = await axios.get(`${API_URL}/auth/me`, config);
        // setUser(response.data);

        // Mock Implementation:
        console.log("Verifying token and loading user...");
        await new Promise(resolve => setTimeout(resolve, 300));
         // Assume token is valid, load mock user
        const storedUser = localStorage.getItem('authUser');
        if(storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(mockUser); // Fallback mock
            localStorage.setItem('authUser', JSON.stringify(mockUser));
        }

      } catch (error) {
        console.error("Token validation failed or user fetch failed:", error);
        // Token is invalid or expired
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        setToken(null);
        setUser(null);
      }
      setIsAuthLoading(false);
    };
    verifyTokenAndLoadUser();
  }, [token]); // Run only when token changes


  // Theme management
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Authentication context functions
  const login = (newToken, userData) => {
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('authUser', JSON.stringify(userData)); // Store user data
    setToken(newToken);
    setUser(userData);
    // Set default axios header if using axios
    // axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setToken(null);
    setUser(null);
    // Remove default axios header if using axios
    // delete axios.defaults.headers.common['Authorization'];
    // Could navigate to login here if not handled by ProtectedRoute
  };

   if (isAuthLoading) {
        // Optional: Show a full-page loader while checking auth status
        return <div className="flex items-center justify-center min-h-screen dark:bg-gray-900"><p className="dark:text-white">Loading...</p></div>;
    }


  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthLoading }}>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <Router>
          <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900 transition-colors duration-200 font-sans`}>
            {token && <Header />} {/* Render Header only if logged in */}
            <main className={token ? "pt-14" : ""}> {/* Add padding top if header is present */}
              <Routes>
                 {/* Public Routes */}
                <Route path="/login" element={!token ? <LoginScreen /> : <Navigate to="/" replace />} />
                <Route path="/signup" element={!token ? <SignupScreen /> : <Navigate to="/" replace />} />

                {/* Protected Routes */}
                <Route path="/" element={<ProtectedRoute><FeedScreen /></ProtectedRoute>} />
                <Route path="/create" element={<ProtectedRoute><CreatePostScreen /></ProtectedRoute>} />
                <Route path="/search" element={<ProtectedRoute><SearchScreen /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><NotificationsScreen /></ProtectedRoute>} />
                <Route path="/saved" element={<ProtectedRoute><SavedPostsScreen /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><SettingsScreen /></ProtectedRoute>} />
                <Route path="/p/:postId" element={<ProtectedRoute><SinglePostScreen /></ProtectedRoute>} />
                <Route path="/:username" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />


                {/* Fallback for unknown routes */}
                 <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
              </Routes>
            </main>
            {/* Add Footer or Bottom Navigation for mobile if needed */}
          </div>
        </Router>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

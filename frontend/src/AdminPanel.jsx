
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Users,
  Mail,
  Activity,
  Trash2,
  Search,
  ShieldCheck,
  User,
  Loader2,
} from "lucide-react";

function AdminPanel() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });

  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // Fetch submissions
  useEffect(() => {
    if (!token) return;

    setLoading(true);

    axios
      .get("http://localhost:5000/api/submissions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSubmissions(res.data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setToken("");
        setLoading(false);
      });
  }, [token]);

  const handleLogin = async () => {
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        creds
      );

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch {
      setError("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setSubmissions([]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this submission?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/submissions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubmissions((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch {
      alert("Failed to delete submission.");
    }
  };

  const filteredSubmissions = submissions.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  // ================= LOGIN SCREEN =================
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-rose-100 flex items-center justify-center px-4">

        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-2xl p-8 w-full max-w-md">

          <div className="text-center mb-8">

            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center mx-auto shadow-lg">
              <ShieldCheck size={30} />
            </div>

            <h2 className="mt-4 text-3xl font-bold text-gray-800">
              Admin Login
            </h2>

            <p className="text-gray-500 mt-2">
              She Can Foundation Dashboard
            </p>

          </div>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Username"
              value={creds.username}
              onChange={(e) =>
                setCreds({
                  ...creds,
                  username: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-pink-100 focus:border-pink-500 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={creds.password}
              onChange={(e) =>
                setCreds({
                  ...creds,
                  password: e.target.value,
                })
              }
              onKeyDown={(e) =>
                e.key === "Enter" && handleLogin()
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-pink-100 focus:border-pink-500 outline-none"
            />

          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-4 text-gray-500 hover:text-pink-600 transition"
          >
            ← Back to Contact Form
          </button>

        </div>
      </div>
    );
  }

  // ================= DASHBOARD =================
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 text-white shadow-xl mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h1 className="text-3xl font-bold">
                Admin Dashboard
              </h1>

              <p className="text-pink-100 mt-2">
                Manage all contact form submissions
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-white/20 backdrop-blur px-5 py-3 rounded-xl hover:bg-white/30 transition flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white rounded-2xl shadow-md p-5">
            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500 text-sm">
                  Total Submissions
                </p>

                <h2 className="text-4xl font-bold text-pink-600 mt-2">
                  {submissions.length}
                </h2>
              </div>

              <Users className="text-pink-500" size={42} />

            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500 text-sm">
                  Emails Received
                </p>

                <h2 className="text-4xl font-bold text-blue-600 mt-2">
                  {submissions.length}
                </h2>
              </div>

              <Mail className="text-blue-500" size={42} />

            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500 text-sm">
                  System Status
                </p>

                <h2 className="text-xl font-semibold text-green-600 mt-2">
                  Active
                </h2>
              </div>

              <Activity className="text-green-500" size={42} />

            </div>
          </div>

        </div>

        {/* Search */}
        <div className="relative mb-6">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm focus:ring-4 focus:ring-pink-100 focus:border-pink-500 outline-none"
          />

        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          {loading ? (
            <div className="flex justify-center items-center py-20">

              <Loader2
                size={32}
                className="animate-spin text-pink-500"
              />

            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No submissions found.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-pink-50">

                  <tr>
                    <th className="px-6 py-4 text-left">
                      User
                    </th>
                    <th className="px-6 py-4 text-left">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left">
                      Message
                    </th>
                    <th className="px-6 py-4 text-left">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left">
                      Action
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {filteredSubmissions.map((s) => (
                    <tr
                      key={s._id}
                      className="border-b hover:bg-pink-50 transition"
                    >

                      <td className="px-6 py-4">

                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                          <User
                            size={18}
                            className="text-pink-600"
                          />
                        </div>

                      </td>

                      <td className="px-6 py-4 font-medium">
                        {s.name}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {s.email}
                      </td>

                      <td className="px-6 py-4 max-w-xs truncate">
                        {s.message}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {new Date(s.date).toLocaleDateString(
                          "en-IN"
                        )}
                      </td>

                      <td className="px-6 py-4">

                        <button
                          onClick={() =>
                            handleDelete(s._id)
                          }
                          className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default AdminPanel;


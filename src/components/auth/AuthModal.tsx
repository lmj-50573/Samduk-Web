import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  if (!isOpen) return null;

  const resetFields = () => {
    setUsername('');
    setPassword('');
    setFullName('');
    setPhone('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'SIGNUP') {
      if (!/^[a-zA-Z0-9_]{4,20}$/.test(username)) {
        setError('아이디는 영문, 숫자, _ 조합 4~20자로 입력해주세요.');
        return;
      }
      if (!fullName.trim()) {
        setError('이름을 입력해주세요.');
        return;
      }
    }

    setLoading(true);

    if (mode === 'LOGIN') {
      const { error } = await signIn(username, password);
      if (error) {
        setError(error);
      } else {
        onClose();
        resetFields();
      }
    } else {
      const { error } = await signUp(username, password, fullName, phone);
      if (error) {
        setError(error);
      } else {
        setSignupSuccess(true);
      }
    }

    setLoading(false);
  };

  const handleClose = () => {
    resetFields();
    setSignupSuccess(false);
    setMode('LOGIN');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8 overflow-y-auto">
      <div className="w-full max-w-sm relative my-auto">
        <button
          onClick={handleClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-white text-black font-black text-xl flex items-center justify-center rounded-xl mx-auto mb-3">
            W
          </div>
          <h1 className="text-white text-xl font-black tracking-tight">WANTU</h1>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <div className="flex mb-6 bg-neutral-800 rounded-xl p-1">
            <button
              onClick={() => { setMode('LOGIN'); resetFields(); setSignupSuccess(false); }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                mode === 'LOGIN' ? 'bg-white text-black' : 'text-neutral-400'
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => { setMode('SIGNUP'); resetFields(); setSignupSuccess(false); }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                mode === 'SIGNUP' ? 'bg-white text-black' : 'text-neutral-400'
              }`}
            >
              회원가입
            </button>
          </div>

          {signupSuccess ? (
            <div className="text-center py-6">
              <p className="text-white font-bold text-sm mb-2">회원가입이 완료됐어요!</p>
              <p className="text-neutral-400 text-xs">
                이제 로그인해서 이용해보세요.
              </p>
              <button
                onClick={() => { setSignupSuccess(false); setMode('LOGIN'); resetFields(); }}
                className="mt-4 text-blue-400 text-xs font-bold underline cursor-pointer"
              >
                로그인하러 가기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-neutral-400 block mb-1.5">아이디</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                  placeholder="영문, 숫자 4~20자"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-400 block mb-1.5">비밀번호</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                  placeholder="6자 이상 입력하세요"
                />
              </div>

              {mode === 'SIGNUP' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-neutral-400 block mb-1.5">이름</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                      placeholder="홍길동"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-400 block mb-1.5">
                      휴대폰 번호 <span className="text-neutral-600">(선택)</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                      placeholder="010-1234-5678"
                    />
                  </div>
                </>
              )}

              {error && (
                <p className="text-red-400 text-xs font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm py-3 rounded-xl transition-colors cursor-pointer"
              >
                {loading ? '처리 중...' : mode === 'LOGIN' ? '로그인' : '회원가입'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
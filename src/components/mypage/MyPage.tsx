import React, { useState } from 'react';
import { User, Phone, Heart, ShieldCheck, Pencil, Check, X, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface MyPageProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
}

export const MyPage: React.FC<MyPageProps> = ({ wishlistCount, onOpenWishlist }) => {
  const { profile, isAdmin, refreshProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [savingInfo, setSavingInfo] = useState(false);
  const [infoError, setInfoError] = useState('');
  const [infoSuccess, setInfoSuccess] = useState(false);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleStartEdit = () => {
    setFullName(profile?.full_name || '');
    setPhone(profile?.phone || '');
    setInfoError('');
    setInfoSuccess(false);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setInfoError('');
  };

  const handleSaveInfo = async () => {
    if (!fullName.trim()) {
      setInfoError('이름을 입력해주세요.');
      return;
    }
    setSavingInfo(true);
    setInfoError('');

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, phone })
      .eq('id', profile?.id);

    if (error) {
      setInfoError('저장에 실패했어요. 다시 시도해주세요.');
    } else {
      setInfoSuccess(true);
      setIsEditing(false);
      await refreshProfile();
      setTimeout(() => setInfoSuccess(false), 3000);
    }
    setSavingInfo(false);
  };

  const handleChangePassword = async () => {
    setPasswordError('');

    if (newPassword.length < 6) {
      setPasswordError('비밀번호는 6자 이상이어야 해요.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않아요.');
      return;
    }

    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setPasswordError('비밀번호 변경에 실패했어요. 다시 시도해주세요.');
    } else {
      setPasswordSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
      setTimeout(() => setPasswordSuccess(false), 3000);
    }
    setSavingPassword(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      {/* Header */}
      <div className="bg-neutral-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
            <User className="w-7 h-7 text-neutral-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black">
                {profile?.username || '회원'}님
              </h1>
              {isAdmin && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-600 text-white rounded-full">
                  ADMIN
                </span>
              )}
            </div>
            <p className="text-neutral-400 text-sm mt-1">마이페이지</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Profile Info Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-neutral-900">회원 정보</h2>
            {!isEditing && (
              <button
                onClick={handleStartEdit}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>수정</span>
              </button>
            )}
          </div>

          {infoSuccess && (
            <div className="mb-4 px-3 py-2 bg-green-50 text-green-700 text-xs font-bold rounded-lg">
              정보가 저장됐어요.
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-neutral-100">
              <div className="flex items-center space-x-3 text-neutral-500">
                <User className="w-4 h-4" />
                <span className="text-sm">아이디</span>
              </div>
              <span className="text-sm font-bold text-neutral-900">{profile?.username || '-'}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-neutral-100">
              <div className="flex items-center space-x-3 text-neutral-500 shrink-0">
                <User className="w-4 h-4" />
                <span className="text-sm">이름</span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="text-sm font-bold text-neutral-900 text-right bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-600 w-40"
                />
              ) : (
                <span className="text-sm font-bold text-neutral-900">{profile?.full_name || '-'}</span>
              )}
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3 text-neutral-500 shrink-0">
                <Phone className="w-4 h-4" />
                <span className="text-sm">휴대폰 번호</span>
              </div>
              {isEditing ? (
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-1234-5678"
                  className="text-sm font-bold text-neutral-900 text-right bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-600 w-40"
                />
              ) : (
                <span className="text-sm font-bold text-neutral-900">{profile?.phone || '등록되지 않음'}</span>
              )}
            </div>
          </div>

          {infoError && (
            <p className="text-red-500 text-xs font-medium mt-3">{infoError}</p>
          )}

          {isEditing && (
            <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-neutral-100">
              <button
                onClick={handleSaveInfo}
                disabled={savingInfo}
                className="flex items-center space-x-1.5 px-4 py-2 bg-neutral-900 hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{savingInfo ? '저장 중...' : '저장'}</span>
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center space-x-1.5 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>취소</span>
              </button>
            </div>
          )}
        </div>

        {/* Password Change Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-bold text-neutral-900 flex items-center space-x-2">
              <Lock className="w-3.5 h-3.5 text-neutral-400" />
              <span>비밀번호 변경</span>
            </h2>
            {!showPasswordForm && (
              <button
                onClick={() => { setShowPasswordForm(true); setPasswordError(''); }}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                변경하기
              </button>
            )}
          </div>

          {passwordSuccess && (
            <div className="mt-3 px-3 py-2 bg-green-50 text-green-700 text-xs font-bold rounded-lg">
              비밀번호가 변경됐어요.
            </div>
          )}

          {showPasswordForm && (
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-bold text-neutral-400 block mb-1.5">새 비밀번호</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="6자 이상 입력하세요"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-400 block mb-1.5">새 비밀번호 확인</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="다시 한번 입력하세요"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-600"
                />
              </div>

              {passwordError && (
                <p className="text-red-500 text-xs font-medium">{passwordError}</p>
              )}

              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={handleChangePassword}
                  disabled={savingPassword}
                  className="px-4 py-2 bg-neutral-900 hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {savingPassword ? '변경 중...' : '비밀번호 변경'}
                </button>
                <button
                  onClick={() => {
                    setShowPasswordForm(false);
                    setNewPassword('');
                    setConfirmPassword('');
                    setPasswordError('');
                  }}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  취소
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={onOpenWishlist}
            className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 text-left hover:border-neutral-900 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-2xl font-black text-neutral-900">{wishlistCount}</span>
            </div>
            <div className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
              찜한 상품
            </div>
            <div className="text-xs text-neutral-500 mt-0.5">관심 있는 제품을 확인해보세요</div>
          </button>

          {isAdmin && (
            <div className="bg-blue-50 rounded-2xl border border-blue-200 shadow-sm p-6">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm font-bold text-blue-900">관리자 권한</div>
              <div className="text-xs text-blue-600 mt-0.5">상품 및 회원 관리 페이지에 접근할 수 있어요</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};